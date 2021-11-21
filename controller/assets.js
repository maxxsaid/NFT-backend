const User = require("../models/user")
const Asset = require("../models/assets")
const {Router} = require("express")
const router = Router()
const auth = require("../auth")

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

//Index Route
router.get("/", auth, async (req, res) => {
    try {
        const {username} = req.payload
        res.status(200).json(await Asset.find({username}))
    }
    catch(error) {
        res.status(400).json({error})
    }
})

//Create Route
router.post("/", auth, async (req, res) => {
    try {
        const {username} = req.payload
        req.body.username = username
        res.status(200).json(await Asset.create(req.body))
    }
    catch(error) {
        res.status(400).json({error})
    }
})
//Update Route
router.put("/:id", auth, async (req, res) => {
    try {
        const {username} = req.payload
        req.body.username = username
        const {id} = req.params
        res.status(200).json(await Asset.findByIdAndUpdate(id, req.body, {new: true}))
    }
    catch(error) {
        res.status(400).json({error})
    }
})
//Destroy Route
router.delete("/:id", auth, async (req, res) => {
    try {
        const {id} = req.params
        res.status(200).json(await Asset.findByIdAndDelete(id))
    }
    catch(error) {
        res.status(400).json({error})
    }
})



module.exports = router
