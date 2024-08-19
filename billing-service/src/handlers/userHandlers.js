// src/handlers/userHandlers.js
const Invoice = require('../models/invoiceModel');
const fs = require('fs');
const path = require('path');

async function handleUserDeleted(eventData) {
    try {
        const userId = eventData.userId;
        console.log(`Handling deletion for user with ID: ${userId}`);

        // Supprimez les factures ou autres données associées à cet utilisateur
        const invoices = await Invoice.find({ user: userId });
        
        // Chemin du dossier des factures
        const invoicesDir = path.join(__dirname, '../invoices');
        
        // Supprimer les fichiers .docx associés aux factures de cet utilisateur
        invoices.forEach(invoice => {
            const filePath = path.join(invoicesDir, `${invoice._id}.docx`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Supprime le fichier
                console.log(`Deleted file: ${filePath}`);
            } else {
                console.log(`File not found: ${filePath}`);
            }
        });

        // Supprimer les enregistrements de factures de la base de données
        await Invoice.deleteMany({ user: userId });

        console.log(`Successfully handled deletion for user with ID: ${userId}`);
    } catch (error) {
        console.error(`Failed to handle user deletion: ${error.message}`);
    }
}

module.exports = { handleUserDeleted };


module.exports = { handleUserDeleted };
