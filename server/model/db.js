const mongoose = require('mongoose');

// database connection

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/OctopusUsersdb');
    console.log('Connected to MongoDB successfully! 🛜');
  } catch (error) {
    console.log('Failed to connect to MongoDB:🥲', error);
  }
}

module.exports = { dbConnection }
