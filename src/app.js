const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./model/user");
const { validateSignup } = require("./utils/validateSignup");
const bcrypt = require("bcrypt");

// this is middleware and activate all routers converted json obj
app.use(express.json());

// sign up
app.post("/signup", async (req, res) => {
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

app.patch("/user/:userId", async (req, res) => {
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
