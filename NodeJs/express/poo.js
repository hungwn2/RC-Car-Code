const express=require("express");
const app=express();
const userRote=require('./routes/user');
const commentsRoute=require('./routes/comments');

app.listen(3005, ()=>{
    console.log("Server is running on http://localhost:3005");
});
