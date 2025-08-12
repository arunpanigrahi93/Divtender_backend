const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{value} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

//compoundindex means combination of indexs will fast like fromuserid to touserid or vice versa
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// check before save
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //check if the fromuserid is same as touserid
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
});

module.exports = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);
