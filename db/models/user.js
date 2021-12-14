const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",default:"61a7750f589f5a40c9c7848f"
  },
  avter: { type: String },
  state: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },

  activeCode: { type: String },
  passwordCode: { type: String },
});

module.exports = mongoose.model("User", user);
