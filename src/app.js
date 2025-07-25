const express = require("express");

const app = express();

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Arun", lastName: "Kumar" });
});

app.post("/user", (req, res) => {
  res.send("Data saved succefully in DB");
});
app.patch("/user", (req, res) => {
  res.send("Update data succefully");
});

app.delete("/user", (req, res) => {
  res.send("Deleted the data successfully");
});

// This will match all the HTTP method API call to /test
app.use("/test", (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("Server running succesfully");
});
