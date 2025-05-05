require('dotenv').config(); // Enable debug logging
const mongoose = require('mongoose');



const connectDB = async () => {
  try {
    
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arti_chat';
    
    console.log('[DEBUG] Attempting to connect to:', uri);
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    });
    
    console.log('🚀🚀👌 MongoDB Connected Successfully!');
  } catch (err) {
    console.error('🤔🤔 MongoDB Connection Error:', err.message);
    process.exit(1); // Exit with error
  }
};

module.exports = connectDB;