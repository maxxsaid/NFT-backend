require("dotenv").config();
const { PORT, DATABASE_URL } = process.env;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const AuthRouter = require("./routes/user.js");
const Assets = require("./routes/assets.js");

////////////////////////

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

app.get("/", auth,(req, res)=>{
    res.json(req.payload)
});

//Auth Route
app.use("/user", AuthRouter);
//collections route
app.use("/assets", Assets);
// Test route
app.get("/", (req, res) => {
    res.send("hello world");
  });

// Index NFTs
app.get('/nft', async (req, res)=> {
    try{
    res.json(await NFT.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
});

//Create NFTs
app.post('/nft', async (req, res)=> {
    try {
        res.json(await NFT.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
});

//Update NFTs
app.put('/nft/:id', async (req, res) => {
    try {
        res.json(await NFT.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        res.status(400).json(error)
    }
});

//Edit NFT information
app.put('/nft/edit/:id', async (req, res)=> {
    try {
        res.json(await NFT.findByIdAndUpdate(req.params.id, req.body, { }));
    } catch (error) {
        res.status(400).json(error)
    }
});

// Delete NFT
app.put('/nft/:id', async (req, res)=>{
    try {
        res.json(await NFT.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(erro)
    }
});

// Show NFTs
app.put('/nft/:id', async (req, res)=>{
    try{
        res.json(await NFT.find(req.params.id))
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
