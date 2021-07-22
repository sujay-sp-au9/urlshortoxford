const { Date } = require("mongoose");
const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema(
  {
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
    clicksDates: {
      type: [
        {
          date: Date,
          referrer: String,
          location: String,
        },
      ],
      required: true,
      default: [],
    },
    user: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
