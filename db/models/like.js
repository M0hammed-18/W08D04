const mongoose = require("mongoose");
const like = new mongoose.Schema({
  like: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});
module.exports = mongoose.model("Like", like);
