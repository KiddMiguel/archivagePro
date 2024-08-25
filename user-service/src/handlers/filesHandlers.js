const User = require('../models/userModel');
const nodemailer = require('nodemailer');

const handleUpadateStockageUser = async (eventData, routingKey) => {
  
  const fileData = eventData.file[0] || eventData.file; 
  const stockage = fileData.length; 
  const userId = fileData.metadata.owner; 

  const user = await User.findById(userId);

  if (!user) {
    console.error(`L'utilisateur avec l'ID ${userId} n'a pas été trouvé`);
    return;
  }

  user.storageUsed = routingKey === "user.stockage.uploaded" ? parseFloat(user.storageUsed) + parseFloat(stockage) : parseFloat(user.storageUsed) - parseFloat(stockage);


// Condition pour alerter si le stockage est dépassé
if (user.storageUsed >= user.storageLimit) {
    console.error(`Dépassement de la limite de stockage de l'utilisateur : ${user.storageUsed}/${user.storageLimit}`);

    // Envoi un mail à l'utilisateur pour l'informer du dépassement de la limite de stockage
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
        to: user.email,
        subject: 'Alerte : Dépassement de la Limite de Stockage',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h1 style="text-align: center; padding: 20px 0; color : #1976d2">
                ArchiDrive
              </h1>

            <p>Bonjour ${user.name},</p>
        
            <p>Nous vous informons que vous avez dépassé la limite de stockage allouée à votre compte qui est de <strong>${user.storageLimit} GB</strong>. 
            Afin de continuer à utiliser nos services sans interruption, nous vous recommandons de libérer de l'espace en supprimant des fichiers ou en augmentant votre capacité de stockage.</p>
        
            <p>Voici quelques actions que vous pouvez entreprendre :</p>
            <ul>
              <li>Supprimer les fichiers obsolètes ou non nécessaires.</li>
              <li>Archiver les documents sur un support externe.</li>
              <li>Passer à un plan de stockage supérieur.</li>
            </ul>
        
            <p>Pour plus de détails ou si vous avez besoin d'assistance, n'hésitez pas à contacter notre équipe de support.</p>
        
            <p>Merci de votre compréhension et de votre coopération.</p>
        
              <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #888;">
                <p>© 2024 ArchiDrive. Tous droits réservés.</p>
                <p>
                  <a href="https://archidrive.com/privacy" style="color: #1a73e8; text-decoration: none;">Politique de confidentialité</a> | 
                  <a href="https://archidrive.com/terms" style="color: #1a73e8; text-decoration: none;">Conditions d'utilisation</a>
                </p>
              </div>
          </div>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi du mail :', error);
        } else {
            console.log('Email envoyé :', info.response);
        }
        
        transporter.close();
        console.log(`Email envoyé à l'utilisateur : ${user.email}`);
    });
}

   

  // Enregistrer les modifications
  await user.save();
  console.log(`Mise à jour du stockage de l'utilisateur : ${user.storageUsed}/${user.storageLimit}`);
};

module.exports = { handleUpadateStockageUser };
