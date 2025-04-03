const express=require('express');
const router=express.Router();
router.get("/cpmments", (req, res)=>{
    res.send({data:"Hers i your data"});
})
router.post("/", (req, res)=>{
    res.send({data:"Hers i your data"});
}

//etc...
module.exports=router;