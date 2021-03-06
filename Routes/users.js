const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const authenticate = require("../Middleware/authentication");

router.get("/details", authenticate, async (req, res) => {
  const name = req.jwtData.username;
  const user = await User.findOne({ username: name });
  if (!user) res.status(401).send("teree ma di");
  return res.send(user);
});
router.get("/usernames", async (req, res) => {
  const user = await User.find();
  res.send(user.map((elem) => elem.username));
});

router.get("/emails", async (req, res) => {
  const user = await User.find();
  res.send(user.map((elem) => elem.email));
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send(`User with given username ${req.body.email} does not exist`);
  if (user.password != req.body.password)
    return res.status(400).send(`Incorrect username password combination`);
  const token = user.generateAuthToken();
  res.json({ jwt_token: token });
});

router.post("/register", async (req, res) => {
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
    const token = user.generateAuthToken();
    res.json({ jwt_token: token });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
