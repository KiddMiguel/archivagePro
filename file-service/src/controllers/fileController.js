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

// Télécharger un fichier
exports.uploadFileToFolder = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: 'No files uploaded' });
    }

    let { folderId } = req.params || req.query;
    let folderName;

    if (!folderId) {
        const rootFolder = await Folder.findOne({ name: 'root_' + req.user.id, owner: req.user.id });
        if (!rootFolder) {
            return res.status(404).send({ message: 'Root folder not found' });
        }
        folderId = rootFolder._id;
        folderName = rootFolder.name;
    } else {
        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).send({ message: 'Folder not found' });
        }
        folderName = folder.name;
    }

    const owner = req.user.id;

    try {
        const db = getDB();
        const bucket = new GridFSBucket(db);

        const filePromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = bucket.openUploadStream(file.originalname, {
                    metadata: { parentFolder: folderId, parentFolderName: folderName, owner }
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
                                parentFolderName: folderName,
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

// Supprimer un fichier d'un user
exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).send({ message: 'File not found' });
        }

        const db = getDB();
        const bucket = new GridFSBucket(db);

        await bucket.delete(new  ObjectId(req.params.id));
        await File.findByIdAndDelete(req.params.id);

        res.status(200).send({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Supprimer un dossier par ID
exports.deleteFolder = async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).send({ message: 'Folder not found' });
        }

        // Supprimer tous les fichiers du dossier
        await File.deleteMany({ "metadata.parentFolder": req.params.id });

        // Supprimer tous les sous-dossiers
        await Folder.deleteMany({ path: { $regex: `^${folder.path}` } });

        // Supprimer le dossier
        await Folder.findByIdAndDelete(req.params.id);

        res.status(200).send({ message: 'Folder deleted successfully' });
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

// Récupérer les dossiers d'un utilisateur
exports.getUserFolders = async (req, res) => {
    try {
        const folders = await Folder.find({ owner: req.params.userId });
        res.status(200).send(folders);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


// Téchareger un fichier
exports.downloadFile = async (req, res) => {
    try {
        const db = getDB();
        const bucket = new GridFSBucket(db);
        const fileId = new ObjectId(req.params.id);

        // Étape 1 : Recherche des métadonnées dans la collection `fs.files` de GridFS
        const file = await bucket.find({ _id: fileId }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).send({ message: 'File not found' });
        }

        // Étape 2 : Recherche des métadonnées supplémentaires dans votre collection `File`
        const fileDB = await File.findOne({ _id: fileId });
        if (!fileDB) {
            return res.status(404).send({ message: 'File metadata not found' });
        }

        // Étape 3 : Configuration des en-têtes de réponse
        res.set({
            'Content-Type': fileDB.contentType ,
            'Content-Disposition': `attachment; filename="${fileDB.filename}"`
        });

        // Étape 4 : Téléchargement du fichier via GridFSBucket
        const downloadStream = bucket.openDownloadStream(fileId);

        downloadStream.on('error', (error) => {
            res.status(500).send({ message: error.message });
        });

        downloadStream.pipe(res).on('finish', () => res.end());

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
