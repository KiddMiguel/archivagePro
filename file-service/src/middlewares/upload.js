const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require('mongoose');

const storage = new GridFsStorage({

  url: process.env.MONGO_URI, 
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads" // Nom du bucket dans GridFS
      };
      resolve(fileInfo);
    });
  }
});

console.log(storage);
const upload = multer({ storage });

module.exports = util.promisify(upload.single('file'));
