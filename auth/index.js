require("dotenv").config()
const jwt = require("jsonwebtoken")
const {SECRET} = process.env

const auth = async (req, res, next) => {
    try{
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, SECRET)
        if (payload) {
            req.payload = payload
            next()
        } else {
            res.status(400).json({error: "Verification Failed or No Payload"})
        }
    } else {
        res.status(400).json({error: "No Authorization Header"})
    }}
    catch(error) {
        res.status(400).json({error})
    }
}

module.exports = auth