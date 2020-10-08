const mongoose = require("mongoose");
const moment = require("moment-timezone");

const FoodSchema = mongoose.Schema({
  foodName: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  photoPath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: moment.tz(new Date(), "Asia/Jakarta"),
  },
});

module.exports = mongoose.model("foods", FoodSchema);
