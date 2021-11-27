require("dotenv").config();
const { PORT, DATABASE_URL } = process.env;
const express = require("express");
const mongoose = require("./models/connection.js");
const morgan = require("morgan");
const app = express();
// const UserRouter = require("./controller/user.js");
const AssetRouter = require("./controller/assets.js");
// const auth = require("./auth");
const Assets = require("./models/Assets.js");
/////////////////////////
// Middleware
/////////////////////////
app.use(morgan("dev"));
app.use(express.json());

//////////////////////
// Routes
//////////////////////

app.get("/", (req, res) => {
  console.log("hit");
  console.log("req", req);
  res.json(req.payload);
});
// app.use("/user", UserRouter);
app.use("/assets", AssetRouter);

// //collections route
// app.use("/assets", Assets);
// // Test route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/nft", (req, res) => {
  try {
    res.json(Assets.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

//Update NFTs
app.post("/nft/:id", (req, res) => {
  try {
    res.json(Assets.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete NFT
app.delete("/nft/:id", (req, res) => {
  try {
    res.json(Assets.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

////////////////////////
// Listener
///////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
