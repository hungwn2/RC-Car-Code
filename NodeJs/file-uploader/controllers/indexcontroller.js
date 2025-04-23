const asynHandler=require("express-async-handler");

exports.inndex=asyncHandler(async(req, res, next)=>{
    res.redirect("/folders");
});