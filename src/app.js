const express = require("express");
const { connectDB } = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // your React app's URL
    credentials: true,
  })
);

// Handle preflight requests
// app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

const port = 3000;

//import routers

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
