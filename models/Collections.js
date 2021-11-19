const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "collection",
  new Schema({
    name: String,
    sales: Number,
    img: String,
    site: String,
    slug: String,
    description: String,
    date_created: String,
  })
);
