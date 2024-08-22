const multer = require('multer');
const path = require('path');

// Configuration de Multer pour l'upload de fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Répertoire où les fichiers sont temporairement stockés
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite la taille des fichiers à 50 Mo
    fileFilter: (req, file, cb) => {
        // Types MIME autorisés
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/zip',
            'application/x-rar-compressed',
            'application/x-7z-compressed',
            'text/plain',
            'text/html',
            'text/css',
            'application/javascript',
            'application/json',
            'application/xml',
            'application/x-httpd-php',
            'audio/mpeg', // pour mp3
            'audio/wav',  // pour wav
            'audio/ogg',  // pour ogg
            'video/mp4', // pour mp4
            'video/x-msvideo', // pour avi
            'video/mpeg', // pour mpeg
            'text/csv',  // pour fichiers CSV
            'application/octet-stream', // pour fichiers binaires
            'application/x-shockwave-flash' // pour fichiers SWF
        ];

        // Extensions autorisées
        const allowedExtensions = /jpeg|jpg|png|gif|webp|pdf|docx|doc|xls|xlsx|ppt|pptx|zip|rar|7z|txt|php|js|html|css|mp3|wav|ogg|mp4|avi|mpeg|csv|json|xml|swf/;

        // Vérification de l'extension du fichier
        const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());

        // Vérification du type MIME
        const mimetype = allowedMimeTypes.includes(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Files of this type are not allowed!');
        }
    }
});

module.exports = upload;
