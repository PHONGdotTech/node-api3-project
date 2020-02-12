// code away!
const express = require("express");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());

server.use("/api/users", userRouter)


server.listen(5000, ()=>{
    console.log("Server running on port 5000")
})