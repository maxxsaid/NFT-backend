//////////////////////////
// Dependencies
//////////////////////////
require("dotenv").config()
const { PORT = 4000, DATABASE_URL } = process.env
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

////////////////////////
// Connection
///////////////////////
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection
.on("open", () => console.log("Connected to mongoose"))
.on("close", () => console.log("Disconnected from mongoose"))
.on("error", (error) => console.log(error))

////////////////////////

//====== Schema & Model =======//

const fetch = (url) =>
import("node-fetch").then(({ default: fetch }) => fetch(url));
let [response, data] = [null, null];
const SALE_COUNT_URL =
  "https://api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=0&limit=20";

const getAssets = async () => {
  Assets.deleteMany({});
  response = await fetch(SALE_COUNT_URL);
  data = await response.json();
  data.assets.forEach((asset) => {
    Assets.create({
      name: asset.name,
      sales: asset.num_sales,
      img: asset.collection.image_url,
      site: asset.external_link,
      slug: asset.collection.slug,
      description: asset.description,
      date_created: asset.date_created,
    });
  });
};
getAssets()

  const Assets = mongoose.model("Assets", assetSchema)


/////////////////////////
// Middleware
/////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//////////////////////
// Routes
//////////////////////

// Test route
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
app.put('/nft/:id', async (req, res) => {
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
