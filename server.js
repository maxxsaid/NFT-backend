require("dotenv").config();
const { PORT, DATABASE_URL } = process.env;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
// const Assets = require("../models/Assets.js")
// const AuthRouter = require("./controller/user.js");
// const Assets = require("./controller/assets.js");
// const auth = require("./auth/index.js")
////////////////////////

//====== Schema & Model =======//

const assetSchema = new mongoose.Schema({
    name: String,
    sales: Number,
    img: String,
    site: String,
    slug: String,
    description: String,
    date_created: String,
  })

//   const Assets = model("Assets", assetSchema)

///======== Mongoose Connection === //

const CONFIG = {
    useNewParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  mongoose.connection
    .on("open", () => console.log("Connected to mongoose"))
    .on("close", () => console.log("Disconnected from mongoose"))
    .on("error", (error) => console.log(error));

module.exports = mongoose


/////////////////////////
// Middleware
/////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//////////////////////
// Routes
//////////////////////

// app.get("/", auth,(req, res)=>{
//     res.json(req.payload)
// });

// //Auth Route
// app.use("/user", AuthRouter);
// //collections route
// app.use("/assets", Assets);
// // Test route

// Test Route
app.get("/", (req, res) => {
    res.send("hello world");
  });

// Index NFTs
app.get('/nft', async (req, res)=> {
    try{
    res.json(await Assets.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
});

//Create NFTs
app.post('/nft', async (req, res)=> {
    try {
        res.json(await Assets.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
});

//Update NFTs
app.post('/nft/:id', async (req, res) => {
    try {
        res.json(await Assets.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        res.status(400).json(error)
    }
});



// Delete NFT
app.delete('/nft/:id', async (req, res)=>{
    try {
        res.json(await Assets.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error)
    }
});



////////////////////////
// Listener
///////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
