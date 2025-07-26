const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://arun123:arun123@cluster0.abeqgv8.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
