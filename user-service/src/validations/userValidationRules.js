// src/validations/userValidationRules.js
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Limite de taux pour la connexion
exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Trop de tentatives de connexion à partir de cette IP, veuillez réessayer après 15 minutes.',
});

// Limite de taux pour l'inscription
exports.registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Trop de comptes ont été créés à partir de cette IP, veuillez réessayer après une heure.',
});

// Règles de validation pour l'inscription
exports.registerValidationRules = [
    check('firstName', 'Le prénom est obligatoire').not().isEmpty(),
    check('lastName', 'Le nom est obligatoire').not().isEmpty(),
    check('email', 'Veuillez indiquer une adresse mail valide').isEmail(),
    check('password')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
        .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule')
        .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
        .matches(/[@$!%*?&#]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),
    // check('address.street', 'Street is required').not().isEmpty(),
    // check('address.city', 'City is required').not().isEmpty(),
    // check('address.postalCode', 'Postal code is required').not().isEmpty(),
    // check('address.country', 'Country is required').not().isEmpty(),
    check('telephone', 'Le téléphone est obligatoire').not().isEmpty(),
];

// Règles de validation pour la mise à jour du profil
exports.updateProfileValidationRules = [
    check('firstName', 'Le prénom est obligatoire').optional().not().isEmpty(),
    check('lastName', 'Le nom est obligatoire').optional().not().isEmpty(),
    check('email', 'Veuillez indiquer une adresse mail valide').optional().isEmail(),
    check('address.street', 'La rue est nécessaire').optional().not().isEmpty(),
    check('address.city', 'La ville est requise').optional().not().isEmpty(),
    check('address.postalCode', 'Le code postal est requis').optional().not().isEmpty(),
    check('address.country', 'Le pays est requis').optional().not().isEmpty(),
    check('telephone', 'Le téléphone est obligatoire').optional().not().isEmpty(),
];

// Règles de validation pour la connexion
exports.loginValidationRules = [
    check('email', 'Veuillez indiquer une adresse mail valide').isEmail(),
    check('password', 'Le mot de passe est requis').exists(),
];

// Règles de validation pour la modification du mot de passe
exports.changePasswordValidationRules = [
    check('oldPassword', 'Le mot de passe actuel est requis').exists(),
    check('newPassword')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
        .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule')
        .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
        .matches(/[@$!%*?&#]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ field: err.param, message: err.msg }));

    return res.status(400).json({
        errors: extractedErrors,
    });
};
