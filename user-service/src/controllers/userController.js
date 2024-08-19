// src/controllers/userController.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAdmin = require('../../../billing-service/src/middlewares/adminMiddleware');
const { publishEvent } = require('../events/publisher'); 

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
      telephone
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
        res.status(200).json({ msg: "User created", success : true , token, user: { id: user.id, email: user.email, isAdmin: user.isAdmin, firstName : user.firstName, lastName : user.lastName } });
      }
    );
    await publishEvent('auth.registered', 'ExchangeAuth', { email :user.email , firstName : user.firstName, lastName : user.lastName });
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
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
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
        res.json({ token, success : true, user: { id: user.id, email: user.email, isAdmin: user.isAdmin, firstName : user.firstName, lastName : user.lastName} });
      }
    );
    await publishEvent('auth.loggedin', 'ExchangeAuth', {email : user.email });
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

    await publishEvent('auth.deleted', 'ExchangeAuth', { email: user.email, userId: user.id });

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

exports.logout = (req, res) => {
  // Logique de déconnexion si nécessaire
  res.json({ msg: 'Logout successful' });
};

exports.test = (req, res) => {
  res.json({ msg: 'Test route is working' });
};
