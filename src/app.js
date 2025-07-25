const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("hello from server");
});
app.use("/", (req, res) => {
  res.send("hello hello homepage");
});

app.listen(3000, () => {
  console.log("Server running succesfully");
});
