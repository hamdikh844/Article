// db.js
const mongoose = require('mongoose');
const { uri, options } = require('./db.config');

const connectDB = async () => {
  try {
    console.log("Attempting to connect with URI:", uri); // Verify again
    const conn = await mongoose.connect(uri, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;