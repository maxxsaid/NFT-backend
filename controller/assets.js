const Assets = require("../models/Assets");
const { Router } = require("express");
const router = Router();

const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

const SALE_COUNT_URL =
  "https://api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=0&limit=40";
Assets.deleteMany({}).then(console.log("deleted"));
fetch(SALE_COUNT_URL)
  .then((response) => response.json())
  .then((data) => {
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
  });

//Index Route
router.get("/", async (req, res) => {
  try {
    res.json(await Assets.find({}));
  } catch (error) {
    res.json({ error });
  }
});

//Create Route
router.post("/", async (req, res) => {
  try {
    const [address, token] = [req.body.address, req.body.token];
    const response = await fetch(
      `https://api.opensea.io/api/v1/asset/${address}/${token}/`
    );
    const asset = await response.json();
    await Assets.create({
      name: asset.name,
      sales: asset.num_sales,
      img: asset.image_url,
      site: asset.external_link,
      slug: asset.slug,
      description: asset.description,
    });
  } catch (error) {
    res.json({ error });
  }
});
//Update Route
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    res.json(await Assets.findByIdAndUpdate(id, req.body, { new: true }));
  } catch (error) {
    res.json({ error });
  }
});
//Destroy Route
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    res.json(await Assets.findByIdAndDelete(id));
  } catch (error) {
    res.json({ error });
  }
});
module.exports = router;
