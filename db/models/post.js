const mongoose = require("mongoose");
const post = new mongoose.Schema({
  desc: { type: String, required: true },
  timeStamp: { type: Date, default: new Date() },
  img: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
});
module.exports = mongoose.model("Post", post);
