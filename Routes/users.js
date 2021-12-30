const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/userModel");

router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post("/", async (req, res) => {
  let emailId = await User.findOne({ email: req.body.email });
  if (emailId)
    return res
      .status(400)
      .send(`User with given email ${req.body.email} already exists!!!`);
  let username = await User.findOne({ username: req.body.username });
  if (username)
    return res
      .status(400)
      .send(`User with given username ${req.body.username} already exists!!!`);
  try {
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
