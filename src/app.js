const express = require("express");
const { connectDB } = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// this is middleware and activate all routers converted json obj
app.use(express.json());
app.use(cookieParser());

const port = 3000;

//import routers

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log("Server running succesfully");
    });
  })
  .catch((err) => {
    console.error("DB not connected");
  });
