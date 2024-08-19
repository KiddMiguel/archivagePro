require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = { connectDB, getDB };
