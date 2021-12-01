const mongoose = require("mongoose");
const like = new mongoose.Schema({
  like:{type:Boolean,default:true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  timeStamp: { type: Date, default: new Date() },
  isDelete: {type: Boolean , default:false},
});
module.exports = mongoose.model("Like", like);
