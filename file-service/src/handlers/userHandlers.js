// src/handlers/userHandlers.js
const { Folder } = require("../models/fileModel");
const path = require("path");

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

module.exports = { handleUserCreated };
