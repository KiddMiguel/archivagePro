const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util'); 
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { Types: { ObjectId } } = require('mongoose');


// Middleware pour vérifier si l'utilisateur est connecté
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // 2) Vérifier si le token est valide
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Vérifier si l'utilisateur existe toujours
    const currentUser = await User.findById(new ObjectId(decoded.userId));
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    // 4) Vérifier si l'utilisateur a changé son mot de passe après l'émission du token
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please log in again.', 401));
    }

    // Accorder l'accès protégé à l'utilisateur
    req.user = currentUser;
    next();
});

// Middleware pour vérifier les rôles des utilisateurs
// exports.restrictTo = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.type)) {
//             return next(new AppError('You do not have permission to perform this action', 403));
//         }
//         next();
//     };
// };
