const express = require("express");
const { adminAuth } = require("../middleware/adminAuth");
const app = express();

app.use("/admin", adminAuth);
app.use("/user", (req, res) => {
  res.send("user check");
});

app.use("/admin/user", (req, res) => {
  res.send("Admin user");
});

app.use("/admin/test", (req, res) => {
  res.send("Admin Test");
});
app.listen(3000, () => {
  console.log("Server running succesfully");
});
