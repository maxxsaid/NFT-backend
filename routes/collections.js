//dependencies
const express = require("express");
const router = express.Router();
const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));
let [response, data] = [null, null];
const Collections = require("../models/Collections.js");
const SALE_COUNT_URL =
  "https://api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=0&limit=20";

const getAssets = async () => {
  await Collections.deleteMany({});
  response = await fetch(SALE_COUNT_URL);
  data = await response.json();
  Collections.create();
  data.assets.forEach((collection) => {
    Collections.create({
      name: collection.name,
      sales: collection.num_sales,
      img: collection.collection.image_url,
      site: collection.external_link,
      slug: collection.collection.slug,
      description: collection.description,
      date_created: collection.date_created,
    });
  });
};
getAssets();
//routing
router.get("/by-sale-count", (req, res) => {
  getAssets();
  Collections.find({})
    .then((collections) => {
      res.json(collections);
    })
    .catch((error) => console.log(error));
});
module.exports = router;
