// db.config.js
require('dotenv').config();

module.exports = {
  uri: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};