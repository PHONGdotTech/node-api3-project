// code away!
require("dotenv").config();
const express = require("express");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use("/api/users", logger, userRouter)

const port = process.env.PORT || 5000
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

function logger(req, res, next){
    const date = new Date().toISOString()
    console.log(req.method, "request to", req.originalUrl, date)

    next();
}