/////////////////////////////////
// Dependencies
///////////////////////////////
require("dotenv").config()
const mongoose = require("mongoose")


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