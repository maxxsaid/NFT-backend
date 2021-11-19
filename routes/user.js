require("dotenv").config();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { SECRET } = process.env;

router.post("/signup", async (req, res) => {
  try {
    console.log("REQ.BODY BEFORE HASH", req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log("REQ.BODY AFTER HASH", req.body);
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = await jwt.sign({ username }, SECRET);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: "PASSWORD DOES NOT MATCH" });
      }
    } else {
      res.status(400).json({ error: "USER DOES NOT EXIST" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
