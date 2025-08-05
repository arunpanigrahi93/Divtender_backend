const express = require("express");

const profileRoute = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

//get profile

profileRoute.get("/profile", async (req, res) => {
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

// get the user data - filtering using emailid
profileRoute.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (!user) {
      res.send("No user found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

profileRoute.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    // not executes unnecessary extra fields

    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      res.status(400).send("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    // await User.findByIdAndUpdate({ _id: userId }, data);
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("user udated successfully");
  } catch (err) {
    res.status(400).send("Update Failed:" + err.message);
  }
});

//delete user by id
// profileRoute.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     //User.findByIdAndDelete({userId,_id})
//     await User.findByIdAndDelete(userId);
//     res.send("user delete succesfully");
//   } catch (err) {
//     res.send("something went wrong");
//   }
// });

//get all user id's from DB
// profileRoute.get("/feed", async (req, res) => {
//   try {
//     const user = await User.find({});
//     if (!user) {
//       res.send("No users found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

module.exports = profileRoute;
