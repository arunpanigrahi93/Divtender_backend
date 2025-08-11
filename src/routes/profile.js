const express = require("express");

const profileRoute = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const userAuth = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validateSignup");

//get profile

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    //finding by id
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

//edit profile
profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //validate data first

    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.send("Profile updated Successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("err" + err);
  }
});

module.exports = profileRoute;
