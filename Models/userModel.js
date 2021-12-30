const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    minlength: 9,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 0,
    max: 1024,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
