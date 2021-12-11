const mongoose = require("mongoose");
const post = new mongoose.Schema({
  desc: { type: String, required: true },
  timeStamp: { type: Date, default: new Date() },
  img: { type: String },
  commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  isDel:{type:Boolean, default:false}
});
module.exports = mongoose.model("Post", post);
