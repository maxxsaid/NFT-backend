const mongoose = require("./connection.js");

const {Schema, model} = mongoose;


const assetSchema = new Schema({
    name: String,
    sales: Number,
    img: String,
    site: String,
    slug: String,
    description: String,
    date_created: String,
  }, {timestamps: true})

  const Assets = model("Assets", assetSchema)

module.exports = Assets
