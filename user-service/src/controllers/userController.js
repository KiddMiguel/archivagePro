// src/controllers/userController.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAdmin = require('../../../billing-service/src/middlewares/adminMiddleware');
const { publishEvent } = require('../events/publisher'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, telephone } = req.body;

  try {
    let user = await userRepository.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ success : false ,  msg: 'L\'utilisateur existe déjà' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      telephone,      
       };

    user = await userRepository.createUser(newUser);

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ msg: "User created", success : true , token, user: { id: user.id, email: user.email, isAdmin: user.isAdmin, firstName : user.firstName, lastName : user.lastName,telephone: user.telephone,  storageLimit : user.storageLimit, address: user.address } });
      }
    );
    await publishEvent('file.stockage.registered', 'ExchangeFile', { userId : user.id, email :user.email , firstName : user.firstName, lastName : user.lastName });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error", success : false });
  }
};

exports.login = async (req, res) => {
  publishEvent('auth.test', 'ExchangeAuth', { message: 'Hello World' });

  const { email, password } = req.body;

  try {
    let user = await userRepository.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: 'Mot de passe incorrect', success: false });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    // Vérification du mot de passe temporaire
    if (!isMatch && user.temporaryPassword && user.temporaryPasswordExpires > Date.now()) {
      isMatch = await bcrypt.compare(password, user.temporaryPassword);
      if (isMatch) {
        // Si l'utilisateur se connecte avec un mot de passe temporaire, on peut envisager de le réinitialiser ici
        user.temporaryPassword = null;
        user.temporaryPasswordExpires = null;
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(400).json({ msg: 'Mot de passe incorrect', success: false });
    }
    

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          success: true,
          user: {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            firstName: user.firstName,
            lastName: user.lastName,
            telephone: user.telephone,
            storageLimit: user.storageLimit,
            address: user.address,
          },
        });
      }
    );

    await publishEvent('auth.loggedin', 'ExchangeAuth', { email: user.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getUserInfo = async (req, res) => {
  try {
    const user = await userRepository.findUserById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    res.json({ success: true, user: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  const { firstName, lastName, address, telephone } = req.body;

  try {
    let user = await userRepository.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    const updateData = {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      address: address || user.address,
      telephone: telephone || user.telephone,
    };

    user = await userRepository.updateUser(req.user.id, updateData);
    await publishEvent('auth.updated', 'ExchangeAuth', {  email: user.email, firstName, lastName, address });
    res.json({ success: true, id : user._id,  address : user.address, firstName : user.firstName, lastName : user.lastName, email : user.email});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await userRepository.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    await userRepository.deleteUser(req.user.id);

    await publishEvent('auth.billing.deleted', 'ExchangeAuth', { email: user.email, userId: user.id });

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await userRepository.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Mot de passe actuel invalide.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ msg: 'Password updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé', success: false });
    }

    // Génération d'un mot de passe temporaire
    const tempPassword = crypto.randomBytes(6).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const hashedTempPassword = await bcrypt.hash(tempPassword, salt);
    // Stockage du mot de passe temporaire dans la base de données avec une expiration de 3 heures
    const expireTime = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 heures à partir de maintenant
    await userRepository.updateUserTemporaryPassword(user.id, hashedTempPassword, expireTime);

    // Configuration de l'email
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="text-align: center; padding: 20px 0; color : #1976d2">
            ArchiDrive
          </h1>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px;">Bonjour <strong>${user.firstName} ${user.lastName}</strong>,</p>
            <p style="font-size: 16px;">Vous avez demandé à réinitialiser votre mot de passe. Voici votre mot de passe temporaire :</p>
            <p style="text-align: center; margin: 20px 0;">
              <span style="font-size: 24px; font-weight: bold; color: #1a73e8; background-color: #e0f7fa; padding: 10px 20px; border-radius: 5px;">
                ${tempPassword}
              </span>
            </p>
            <p style="font-size: 16px;">Ce mot de passe est valide pour les 3 prochaines heures.</p>
            <p style="font-size: 16px;">Veuillez l'utiliser pour vous connecter et modifier votre mot de passe dès que possible.</p>
            <p style="font-size: 16px; color: #ff0000;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
            <p style="font-size: 16px;">Cordialement,</p>
            <p style="font-size: 16px;"><strong>L'équipe ArchiDrive</strong></p>
          </div>
          <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #888;">
            <p>© 2024 ArchiDrive. Tous droits réservés.</p>
            <p>
              <a href="https://archidrive.com/privacy" style="color: #1a73e8; text-decoration: none;">Politique de confidentialité</a> | 
              <a href="https://archidrive.com/terms" style="color: #1a73e8; text-decoration: none;">Conditions d'utilisation</a>
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de réinitialisation de mot de passe envoyé à ${email}`);

    res.json({ msg: 'Email envoyé', success: true });
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'email de réinitialisation du mot de passe: ${error.message}`);
    res.status(500).send('Erreur serveur');
  }
};

exports.logout = (req, res) => {
  // Logique de déconnexion si nécessaire
  res.json({ msg: 'Logout successful' });
};

exports.test = (req, res) => {
  res.json({ msg: 'Test route is working' });
};
