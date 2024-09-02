// src/handlers/userHandlers.js
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const { Folder, File } = require("../models/fileModel");
const { GridFSBucket } = require("mongodb");
const path = require("path");
const nodemailer = require('nodemailer');


async function handleUserCreated(eventData) {
  try {
    const userId = eventData.userId;
    // Créer un dossier pour l'utilisateur
    const userFolder = new Folder({
      name: "root_"+userId,
      parentFolder: null,
      path: path.join("root"),
      owner : userId,
    });

    await userFolder.save();
    console.log(`Dossier créé pour l'utilisateur avec ID: ${userId}`);
  } catch (error) {
    console.error(`Failed to handle user deletion: ${error.message}`);
  }
}

const handleUserDelete = async (eventData) => {
  try {
    const userId = eventData.userId;
    const db = getDB();
    const bucket = new GridFSBucket(db);

    // Find all files belonging to the user
    const files = await File.find({ "metadata.owner": userId });

    // Nombre de fichiers
    const nbFiles = files.length;

    // Delete each file and its associated chunks
    for (const file of files) {
      await bucket.delete(new ObjectId(file._id)); // Delete file chunks
    }

    // Delete user’s folder structure
    await Folder.deleteMany({ owner: userId });

    // Delete user’s file metadata from the File collection
    await File.deleteMany({ "metadata.owner": userId });
    const messageUser = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h1 style="text-align: center; padding: 20px 0; color: #1976d2;">
        ArchiDrive
      </h1>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <p>Bonjour, ${eventData.firstName} ${eventData.lastName}</p>
      <p>Nous vous confirmons que votre compte ArchiDrive a bien été supprimé conformément à votre demande. Toutes vos données associées ont été effacées de nos serveurs.</p>
      <p>Si vous avez des questions ou si vous avez besoin de plus d'informations, n'hésitez pas à nous contacter via notre support client.</p>
      <p>Merci d'avoir utilisé ArchiDrive.</p>
      <p>Cordialement,</p>
      <p>L'équipe ArchiDrive</p>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #888;">
        <p>© 2024 ArchiDrive. Tous droits réservés.</p>
        <p>
          <a href="https://archidrive.com/privacy" style="color: #1a73e8; text-decoration: none;">Politique de confidentialité</a> | 
          <a href="https://archidrive.com/terms" style="color: #1a73e8; text-decoration: none;">Conditions d'utilisation</a>
        </p>
      </div>
    </div>
    `;
    await sendingEmail(eventData, eventData.email, messageUser, "Suppression de compte");


    const messageAdmin = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h1 style="text-align: center; padding: 20px 0; color: #1976d2;">
        ArchiDrive - Notification d'administration
      </h1>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <p>Bonjour,</p>
      <p>Nous vous informons que le compte de l'utilisateur <strong>${eventData.firstName} ${eventData.lastName}</strong> a été supprimé avec succès.</p>
      <p>Le nombre total de fichiers supprimés associés à ce compte est de <strong>${nbFiles}</strong>.</p>
      <p>Cette suppression a été effectuée conformément à la demande de l'utilisateur.</p>
      <p>Veuillez prendre en considération cette action pour vos enregistrements.</p>
      <p>Cordialement,</p>
      <p>L'équipe ArchiDrive</p>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #888;">
        <p>© 2024 ArchiDrive. Tous droits réservés.</p>
      </div>
    </div>
    `;

    eventData.adminEmails.map(async (email) => {
      await sendingEmail(eventData, email, messageAdmin, `Suppression de compte de ${eventData.firstName} ${eventData.lastName}`);
    });

    console.log(`All files and folders deleted for user with ID: ${userId}`);
  } catch (error) {
    console.error(`Failed to handle user deletion: ${error.message}`);
  }
};

const sendingEmail = async (eventData, to, message, subject) => {
  try {
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
      to: to,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
};

module.exports = { handleUserCreated, handleUserDelete };
