// src/models/userModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  temporaryPassword: {
    type: String,
  },
  temporaryPasswordExpires: {
    type: Date,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  storageUsed: {
    type: Number,
    default: 0, // in bytes
  },
  storageLimit: {
    type: Number,
    default: 20 * 1024 * 1024 * 1024, // 20GB in bytes
  },
  subscription: {
    type: String,
    enum: ['basic', 'premium'],
    default: 'basic',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
