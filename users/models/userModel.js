const mongoose = require("mongoose");
const moment = require("moment-timezone");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  createdAt: {
    type: Date,
    default: moment.tz(new Date(), "Asia/Jakarta"),
  },
});

module.exports = mongoose.model("users", UserSchema);
