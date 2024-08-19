// src/repositories/userRepository.js
const User = require('../models/userModel');

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }


   findUserById(userId) {
    return  User.findById(userId); // Retournons l'objet de requête ici
  }

  async updateUser(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return user;
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async getAllUsers() {
    return await User.find();
  }

  async updateStorageUsed(userId, storageUsed) {
    return await User.findByIdAndUpdate(userId, { storageUsed });
  }

  async updateUserTemporaryPassword (userId, temporaryPassword, temporaryPasswordExpires) {
    return await User.findByIdAndUpdate(userId, { temporaryPassword, temporaryPasswordExpires });
  }
  
}

module.exports = new UserRepository();
