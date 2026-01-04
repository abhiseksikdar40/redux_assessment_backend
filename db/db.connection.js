const mongoose = require("mongoose");

let isConnected = false;

const initializeDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected Successfully");
  } catch (error) {
    console.error("Connection Failed", error);
  }
};

module.exports = { initializeDatabase };
