// src/validations/userValidationRules.js
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Limite de taux pour la connexion
exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

// Limite de taux pour l'inscription
exports.registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many accounts created from this IP, please try again after an hour',
});

// Règles de validation pour l'inscription
exports.registerValidationRules = [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character'),
    check('address.street', 'Street is required').not().isEmpty(),
    check('address.city', 'City is required').not().isEmpty(),
    check('address.postalCode', 'Postal code is required').not().isEmpty(),
    check('address.country', 'Country is required').not().isEmpty(),
];

// Règles de validation pour la mise à jour du profil
exports.updateProfileValidationRules = [
    check('firstName', 'First name is required').optional().not().isEmpty(),
    check('lastName', 'Last name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('address.street', 'Street is required').optional().not().isEmpty(),
    check('address.city', 'City is required').optional().not().isEmpty(),
    check('address.postalCode', 'Postal code is required').optional().not().isEmpty(),
    check('address.country', 'Country is required').optional().not().isEmpty(),
];

// Règles de validation pour la connexion
exports.loginValidationRules = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
];

// Règles de validation pour la modification du mot de passe
exports.changePasswordValidationRules = [
    check('oldPassword', 'Current password is required').exists(),
    check('newPassword')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character'),
];

// Middleware pour valider les règles de validation
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(400).json({
        errors: extractedErrors,
    });
};
