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
const cors = require("cors");

/////////////////////////
// Middleware
/////////////////////////
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//////////////////////
// Routes
//////////////////////

// app.use("/user", UserRouter);
app.use("/assets", AssetRouter);

// //collections route
// app.use("/assets", Assets);
// // Test route
app.get("/", (req, res) => {
  res.send("hello world");
});

////////////////////////
// Listener
///////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
