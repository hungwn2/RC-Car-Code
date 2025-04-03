const db=require('./db');

const asyncHandler=require("express-async-handler");
async function getAuthorById=asyncHandler(async(req,res)=>{
    const {authorId}=req.params;
    
    const author=await db.getAuthorById(authorId);
    if(!author){
        res.status(404).send("Author not found");
        return;
    }
    res.send(`${author.name}`);
});
module.exports={getAuthorById}