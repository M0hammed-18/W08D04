const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  desc: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  isDelete: { type: Boolean, default: false },
  timeStamp: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Comment", comment);
