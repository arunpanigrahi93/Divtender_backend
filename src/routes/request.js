const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequestModel");
const User = require("../model/user");

const requestRoute = express.Router();

requestRoute.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    // only allowed status
    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "invalid status type: " + status });
    }

    // check the touserid is existing in db or not

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: "user not found" });
    }
    // alrdy connection res send fromuserid to touserid or touserid to fromuserid

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      res.status(400).json({
        message: "Connection request Already exists",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: "Connection request send successfully",
      data,
    });
    try {
    } catch (err) {
      console.log("Error" + err.message);
    }
  }
);

module.exports = requestRoute;
