const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour les dossiers
const FolderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        default: null  // null si c'est un dossier racine
    },
    path: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Référence à l'utilisateur propriétaire
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Schéma pour les fichiers (géré par GridFS, mais avec des métadonnées supplémentaires)
const FileSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    chunkSize: {
        type: Number,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    },
    md5: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    metadata: {
        parentFolder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Folder',  // Référence au dossier parent
            default: null
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Référence à l'utilisateur propriétaire
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        tags: [String]
    }
});

// Modèles
const Folder = mongoose.model('Folder', FolderSchema);
const File = mongoose.model('File', FileSchema);

module.exports = {
    Folder,
    File
};
