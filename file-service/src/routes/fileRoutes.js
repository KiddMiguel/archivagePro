const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Télécharger un fichier
router.post('/upload', authMiddleware, upload.single('file'), fileController.uploadFile);

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
