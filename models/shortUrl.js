const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
