const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("DB is connected");
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
