// src/middlewares/adminMiddleware.js
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Access denied, admin only' });
  }
  next();
};

module.exports = isAdmin;
