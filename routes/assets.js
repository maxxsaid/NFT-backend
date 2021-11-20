//dependencies
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

router.get("/cllect", (req, res) => {
  getAssets();
  Assets.find({})
    .then((Assets) => {
      res.json(Assets);
    })
    .catch((error) => res.error(error));
});
module.exports = router;
