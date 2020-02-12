// code away!
const express = require("express");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use("/api/users", logger, userRouter)


server.listen(5000, ()=>{
    console.log("Server running on port 5000")
})

function logger(req, res, next){
    const date = new Date().toISOString()
    console.log(req.method, "request to", req.originalUrl, date)

    next();
}