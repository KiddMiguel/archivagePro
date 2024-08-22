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
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: 'No files uploaded' });
    }

    let { folderId } = req.params || req.query;

    if (!folderId) {
        const rootFolder = await Folder.findOne({ name: 'root_' + req.user.id, owner: req.user.id });
        if (!rootFolder) {
            return res.status(404).send({ message: 'Root folder not found' });
        }
        folderId = rootFolder._id;
    }

    const owner = req.user.id;

    try {
        const db = getDB();
        const bucket = new GridFSBucket(db);

        const filePromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = bucket.openUploadStream(file.originalname, {
                    metadata: { parentFolder: folderId, owner }
                });

                const readStream = fs.createReadStream(file.path);

                readStream.pipe(uploadStream)
                    .on('error', (error) => reject(error))
                    .on('finish', async () => {
                        const fileId = uploadStream.id;
                        await File.create({
                            _id: fileId,
                            filename: file.originalname,
                            length: file.size,
                            chunkSize: 255 * 1024,
                            uploadDate: new Date(),
                            contentType: file.mimetype,
                            metadata: {
                                parentFolder: folderId,
                                owner
                            }
                        });

                        // Supprimer le fichier temporaire après l'upload
                        fs.unlink(file.path, (error) => {
                            if (error) {
                                console.error(`Error deleting temp file: ${error.message}`);
                            }
                        });

                        resolve(fileId);
                    });

                readStream.on('error', reject);
            });
        });

        const uploadedFileIds = await Promise.all(filePromises);

        res.status(201).send({ message: 'Files uploaded successfully', fileIds: uploadedFileIds });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// récupérer le dossier parent root
exports.getRootFolder = async (req, res) => {
    console.log(req);
    try {
      const rootFolder = await Folder.findOne({ name: 'root_' + req.user.id, owner: req.user.id });
      if (!rootFolder) {
        return res.status(404).send({ message: 'Root folder not found' });
      }
      res.status(200).send(rootFolder);
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
