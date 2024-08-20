const { GridFSBucket, ObjectId } = require('mongodb');
const { Folder, File } = require('../models/fileModel');
const { getDB } = require('../config/db');
const fs = require('fs');

// Créer un dossier
exports.createFolder = async (req, res) => {
    const { name, parentFolderId} = req.body;
    const owner = req.user.id;

    try {
        let parentFolder = null;
        let path = name;

        // Vérifier si le dossier parent existe
        if (parentFolderId) {
            parentFolder = await Folder.findById(parentFolderId);
            if (!parentFolder) {
                return res.status(404).send({ message: 'Parent folder not found' });
            }
            // Créer le chemin complet du dossier
            path = `${parentFolder.path}/${name}`;
        }

        // Créer un nouveau dossier
        const newFolder = new Folder({
            name,
            parentFolder: parentFolderId || null,
            path,
            owner,
        });

        await newFolder.save();
        res.status(201).send({ message: 'Folder created successfully', folder: newFolder });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Téléverser un fichier dans un dossier
exports.uploadFileToFolder = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    const { folderId } = req.query || req.params;
    const owner = req.user.id;

    try {
        const db = getDB();
        const bucket = new GridFSBucket(db);

        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).send({ message: 'Folder not found' });
        }

        // Créer un flux de téléversement pour le fichier
        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            metadata: { parentFolder: folderId, owner }
        });

        // Lire le fichier et le téléverser dans la base de données
        fs.createReadStream(req.file.path).pipe(uploadStream)
            .on('error', (error) => res.status(500).send({ message: error.message }))
            .on('finish', async () => {
                const fileId = uploadStream.id;
                await File.create({
                    _id: fileId,
                    filename: req.file.originalname,
                    length: req.file.size, // Taille du fichier
                    chunkSize: 255 * 1024,  // 255 KB
                    uploadDate: new Date(), // Date de téléversement
                    md5: req.file.md5 || '',  // MD5 hash du fichier
                    contentType: req.file.mimetype, // Type de contenu du fichier
                    metadata: { // Métadonnées supplémentaires
                        parentFolder: folderId,
                        owner,
                        description: req.body.description || '',
                        tags: req.body.tags || []
                    }
                });

                res.status(201).send({ message: 'File uploaded successfully', fileId });
            });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Récupérer un fichier par ID
exports.getFile = async (req, res) => {
    try {
        const db = getDB();
        const bucket = new GridFSBucket(db);
        const downloadStream = bucket.openDownloadStream(ObjectId(req.params.id));

        downloadStream.pipe(res)
            .on('error', (error) => res.status(500).send({ message: error.message }))
            .on('finish', () => res.end());
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Supprimer un fichier par ID
exports.deleteFile = async (req, res) => {
    try {
        const db = getDB();
        const bucket = new GridFSBucket(db);
        await bucket.delete(ObjectId(req.params.id));
        await File.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Récupérer les fichiers d'un utilisateur
exports.getUserFiles = async (req, res) => {
    try {
        const files = await File.find({ "metadata.owner": req.params.userId });
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Récupérer tous les fichiers
exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find({});
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Récupérer les fichiers d'un dossier
exports.getFolderFiles = async (req, res) => {
    try {
        const files = await File.find({ "metadata.parentFolder": req.params.folderId });
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
