const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://arun123:arun123@cluster0.abeqgv8.mongodb.net/"
  );
};

connectDB()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("DB not connected");
  });
