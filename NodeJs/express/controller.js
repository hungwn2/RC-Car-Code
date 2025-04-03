const path=require("path");
const express=require("express");
const app=express();

app.use((req, res)=>{
    res.send("Hello");
    console.log()
})

function myMiddleWare(req, res, next){
    console.log("I am a middleware");
    req.customProperty="custom";
    next();
}
//functions in chain can access custom prop

app.use**err

app.use(myMiddleWare)