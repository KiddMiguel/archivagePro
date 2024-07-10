const { check } = require('express-validator');
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
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

// Règles de validation pour la mise à jour du profil
exports.updateProfileValidationRules = [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
];

// Règles de validation pour la connexion
exports.loginValidationRules = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
];

// Modication du mot de passe
exports.changePasswordValidationRules = [
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('newPassword', 'Please enter a new password with 6 or more characters').isLength({ min: 6 }),
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


