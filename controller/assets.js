const mongoose = require("../models/connection.js");
const {Schema, model} = mongoose;
const auth = require("../auth")
const Assets = require("../models/Assets.js")
const express = require("express");
const router = express.Router();


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

getAssets();
//routing
router.get("/", (req, res) => {
  getAssets();
  Assets.find({})
    .then((Assets) => {
      res.json(Assets);
    })
    .catch((error) => res.error(error));
});

router.get("/collect", (req, res) => {
  getAssets();
  Assets.find({})
    .then((Assets) => {
      res.json(Assets);
    })
    .catch((error) => res.error(error));
});



// Index NFTs
router.get('/:id',auth, async (req, res)=> {
    try{
    const { username } = req.payload
    req.body.username = username 
    const { id } = req.params
    res.json(await Assets.find({ username }))
    } catch (error) {
        res.status(400).json(error)
    }
});

//Create NFTs
router.post('/nft', auth,  async (req, res)=> {
    try {
        const { username } = req.payload
        req.body.username = username 
        res.json(await Assets.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
});

//Update NFTs
router.put('/nft/:id', auth ,  async (req, res) => {
    try {
        const { username } = req.payload
        req.body.username = username 
        res.json(await NFT.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        res.status(400).json(error)
    }
});

//Edit NFT information
router.put('/nft/edit/:id', async (req, res)=> {
    try {
        res.json(await NFT.findByIdAndUpdate(req.params.id, req.body, { }));
    } catch (error) {
        res.status(400).json(error)
    }
});

// Delete NFT
router.put('/nft/:id', async (req, res)=>{
    try {
        res.json(await NFT.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(erro)
    }
});

// Show NFTs
router.put('/nft/:id', async (req, res)=>{
    try{
        res.json(await NFT.find(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
});




module.exports = router
