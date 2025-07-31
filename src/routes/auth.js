const express = require("express");
const { validateSignup } = require("../utils/validateSignup");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

// sign up
authRouter.post("/signup", async (req, res) => {
  // Creating new instance of the User model

  // console.log(req.body);
  try {
    //validate req using any helper function
    validateSignup(req);

    //encript password
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user created successfully");
  } catch (err) {
    console.error("user not created:" + err.message);
    res.send("user not created:" + err.message);
  }
});

// login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //first validate email is present or not

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    //next compare password with db
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");
      console.log(token);
      res.cookie("token", token);
      res.send("User login succesfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.send("Error:" + err.message);
  }
});

module.exports = authRouter;
