require("dotenv").config();
const { PORT = 3001, DATABASE_URL } = process.env;
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const bcrypt = require("bcrypt");
const AuthRouter = require("./routes/user.js");
const user = require("./models/user.js");
const Collections = require("./routes/Collections.js");

////////////////////////
// Connection
///////////////////////

mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
  .on("open", () => console.log("Connected to mongoose"))
  .on("close", () => console.log("Disconnected from mongoose"))
  .on("error", (error) => console.log(error));

// ============================//

//====== Schema & Model =======//

const nftSchema = new mongoose.Schema(
  {
    name: "",
    image_url: "",
    external_link: "",
    description: "",
    traits: "",
    stats: "",
  },
  { timestamps: true }
);

const NFT = mongoose.model("NFT", nftSchema);

/////////////////////////
// Middleware
/////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//////////////////////
// Routes
//////////////////////
//Auth Route
app.use("/user", AuthRouter);
//collections route
app.use("/collections", Collections);
// Test route
app.get("/", (req, res) => {
  res.send("hello world");
});

////////////////////////
// Listener
///////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
