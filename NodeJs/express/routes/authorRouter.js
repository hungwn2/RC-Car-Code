const {Router}=require("express");
const authorRouter=Router();

authorRouter.get(":/authorId", (req, res)=> res.send("all authors");
authorRouter.get(":/authorId", (req, res)=>{
    const {authorId}=req.params;
    res.send(`Author ID: ${authorId}`);
})
module.exports=authorRouter;