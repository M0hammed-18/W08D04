const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  avter: { type: String },
  passcode: { type: String },
  active: {
    type: Boolean,
    default: false,
  },
  activecode: { type: String },
});

module.exports = mongoose.model("User", user);
