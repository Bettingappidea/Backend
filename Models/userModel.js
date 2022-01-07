const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ username: this.username }, process.env.App_jwtPrivateKey);
};
const User = mongoose.model("user", userSchema);
module.exports = User;
