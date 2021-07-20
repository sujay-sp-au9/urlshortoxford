const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
