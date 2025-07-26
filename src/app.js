const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./model/user");

// this is middleware and activate all routers converted json obj
app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating new instance of the User model
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    console.error("user not created:" + err.message);
  }
});

// get the user data - filtering using emailid
app.get("/user", async (req, res) => {
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

//get all user id's from DB
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      res.send("No users found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//update exesting user

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user udated successfully");
  } catch (err) {
    res.send("somenthing went wrong");
  }
});

//delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //User.findByIdAndDelete({userId,_id})
    await User.findByIdAndDelete(userId);
    res.send("user delete succesfully");
  } catch (err) {
    res.send("something went wrong");
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
