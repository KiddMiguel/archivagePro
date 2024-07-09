const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route de test
router.get('/test', userController.test);

module.exports = router;
