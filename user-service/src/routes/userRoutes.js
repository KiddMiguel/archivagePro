// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const {
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
  changePasswordValidationRules,
  validate,
  loginLimiter,
  registerLimiter,
  forgotPasswordValidationRules
} = require('../validations/userValidationRules');
const { verifyToken } = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');
const router = express.Router();

// Route pour l'inscription
router.post('/register', registerValidationRules, validate, userController.register);
// Route pour l'incription d'un admin
router.post('/register/admin', registerValidationRules, validate, userController.registerAdmin);
// Route pour la connexion
router.post('/login', loginValidationRules, validate, userController.login);
// Route pour la récupération du profil
router.get('/profile', verifyToken, userController.getUserInfo);
// Route pour la mise à jour du profil
router.put('/profile', verifyToken, updateProfileValidationRules, validate, userController.updateProfile);
// Route pour la suppression du profil
router.delete('/profile', verifyToken, userController.deleteProfile);
// Route pour la récupération de tous les utilisateurs avec vérification admin
router.get('/users', verifyToken, isAdmin, userController.getAllUsers);
// Route pour la modification d'un mot de passe
router.put('/password', verifyToken, changePasswordValidationRules, validate, userController.changePassword);
// Route pour la récupération d'un mot de passe oublié
router.post('/forgot-password',forgotPasswordValidationRules,  userController.forgotPassword);
// Route pour la déconnexion
router.get('/logout', userController.logout);
// Route de test
router.get('/test', userController.test);

module.exports = router;
