const express = require("express");

const profileRoute = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

//get profile

profileRoute.get("/profile/view", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    //validate token
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedMessage;
    console.log("Logged In User is :" + _id);

    //finding by id
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exist");
    }
    // console.log(cookies);
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = profileRoute;
