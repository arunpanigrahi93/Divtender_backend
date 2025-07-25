const express = require("express");

const app = express();

app.use(
  "/user",
  [
    (req, res, next) => {
      next();

      // res.send("response 1");
    },
    (req, res, next) => {
      next();
    },
  ],
  (req, res) => {
    res.send("Response 3");
  },
  (req, res) => {
    res.send("Response 4");
  }
);

app.listen(3000, () => {
  console.log("Server running succesfully");
});
