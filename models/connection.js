/////////////////////////////////
// Dependencies
///////////////////////////////
require("dotenv").config()
const mongoose = require("mongoose")

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewParser: true,
    useUnifiedTopology: true,
}


/////////////////////////////////////
// Establish Database Connection
/////////////////////////////////////
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  mongoose.connection
    .on("open", () => console.log("Connected to mongoose"))
    .on("close", () => console.log("Disconnected from mongoose"))
    .on("error", (error) => console.log(error));

module.exports = mongoose