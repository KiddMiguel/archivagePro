const User = require('../models/userModel'); // Supposons que vous ayez un modèle User
const { promisify } = require('util');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT
const generateJwtToken = (userId, type) => {
    return jwt.sign({ userId, type }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// Contrôleur de test
exports.test = (req, res) => {
    res.status(200).send('User Service is working!');
};

