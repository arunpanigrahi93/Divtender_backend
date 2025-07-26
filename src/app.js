const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./model/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    console.error("user not created:" + err.message);
  }
});

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
