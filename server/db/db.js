require("dotenv").config;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://kumarhritik158:v4sqTZxqUm81UNut@cluster0.misgalp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Databse connected")
  } catch (err) {
    console.log("Error cannot connect to the server :", err);
    process.exit(1);
  }
};

module.exports = connectDB;
