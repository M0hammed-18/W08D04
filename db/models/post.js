const mongoose = require("mongoose");
const post = new mongoose.Schema({
  desc: { type: String, required: true },
  time: { type: Date,default:Date.now },
  img: { type: String},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  like: { type: String,  ref: "User" },
});
module.exports = mongoose.model("Post", post);