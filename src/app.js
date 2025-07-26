const express = require("express");
const { connectDB } = require("./config/database");
const app = express();

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(3000, () => {
      console.log("Server running succesfully");
    });
  })
  .catch((err) => {
    console.error("DB not connected");
  });
