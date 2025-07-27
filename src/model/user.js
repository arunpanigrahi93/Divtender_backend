const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      //not allowed same email
      unique: true,
      //not allowerd uppercase
      lowercase: true,
      //trim removes spaces
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Your password is week");
        }
      },
    },
    age: {
      type: Number,
      //allow only 18 and above
      age: 18,
    },
    gender: {
      type: String,
      // make sure allow validate in options of update routing function otherwise it will work on initiall sign up not update
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "this is default value of user about",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
