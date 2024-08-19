const { GridFSBucket, ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const fs = require('fs');

// Télécharger un fichier
exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    try {
        const db = getDB();
        const bucket = new GridFSBucket(db);
        const uploadStream = bucket.openUploadStream(req.file.originalname);

        fs.createReadStream(req.file.path).pipe(uploadStream)
            .on('error', (error) => res.status(500).send({ message: error.message }))
            .on('finish', () => res.status(201).send({ message: 'File uploaded successfully', fileId: uploadStream.id }));
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
        res.status(200).send({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Récupérer les fichiers d'un utilisateur
exports.getUserFiles = async (req, res) => {
    try {
        const db = getDB();
        const files = await db.collection('fs.files').find({ "metadata.userId": req.params.userId }).toArray();
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Récupérer tous les fichiers
exports.getAllFiles = async (req, res) => {
    try {
        const db = getDB();
        const files = await db.collection('fs.files').find({}).toArray();
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Récupérer les fichiers d'un dossier
exports.getFolderFiles = async (req, res) => {
    try {
        const db = getDB();
        const files = await db.collection('fs.files').find({ "metadata.folderId": req.params.folderId }).toArray();
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
