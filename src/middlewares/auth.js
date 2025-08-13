const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  //read the token from req cookies
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      return res.status(401).send("please login");
    }

    const decodeObj = await jwt.verify(token, "DEV@Tinder$790", {
      expiresIn: "1d",
    });

    const { _id } = decodeObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
};

module.exports = userAuth;
