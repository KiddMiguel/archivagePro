// src/middlewares/adminMiddleware.js
const User = require('../models/userModel');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied, admin only' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = isAdmin;
