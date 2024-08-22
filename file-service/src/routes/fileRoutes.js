const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/upload');

// Créer un dossier
router.post('/folder', authMiddleware, fileController.createFolder);

// récupérer un dossier parent root
router.get('/root', authMiddleware, fileController.getRootFolder);

// Supprimer un dossier par ID
router.delete('/folder/:id', authMiddleware, fileController.deleteFolder);

// Récupérer les fichiers d'un dossier
router.get('/folder/:folderId', authMiddleware, fileController.getFolderFiles);

// Récupérer les dossiers d'un utilisateur
router.get('/folder/user/:userId', authMiddleware, fileController.getUserFolders);

// Télécharger un fichier
router.post('/upload', authMiddleware, upload.array('file', 10), fileController.uploadFileToFolder);

// Récupérer un fichier par ID
router.get('/:id', authMiddleware, fileController.getFile);

// Supprimer un fichier par ID
router.delete('/:id', authMiddleware, isAdmin, fileController.deleteFile);

// Récupérer les fichiers d'un utilisateur
router.get('/user/:userId', authMiddleware, fileController.getUserFiles);

// Récupérer tous les fichiers
router.get('/', authMiddleware, isAdmin, fileController.getAllFiles);

// Récupérer les fichiers d'un dossier
router.get('/folder/:folderId', authMiddleware, fileController.getFolderFiles);

module.exports = router;
