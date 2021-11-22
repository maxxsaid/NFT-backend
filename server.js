require("dotenv").config();
const { PORT, DATABASE_URL } = process.env;
const express = require("express");
const mongoose = require("./models/connection.js");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const UserRouter = require("./controller/user.js");
const AssetRouter = require("./controller/assets.js")
const auth = require("./auth")


/////////////////////////
// Middleware
/////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//////////////////////
// Routes
//////////////////////

app.get("/", auth, (req, res) => {
    res.json(req.payload)
})
app.use("/user", UserRouter);
app.use("/assets", AssetRouter)

// //collections route
// app.use("/assets", Assets);
// // Test route
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

//Update NFTs
app.post('/nft/:id', async (req, res) => {
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
