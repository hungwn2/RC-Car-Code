const express = require("express");
const pool = require("../db/pool");
const router = express.Router();

router.get("/new", (req, res)=> res.render("new-message"));
router.post("/new", async(req, res)=>{
    const {title, content}=req.body;
    await pool.query("INSERY INTO messages (title, content, user_id) VALUES ($1, $2, $3)", [
        title, content, req.user.id]);
        res.redirect("/");
});
router.post("/:id/delete", async(req, res)=>{
    if (req.user.is_admin){
        await pool.query("DELETE FROM messages WHERE id =$1", [req.paramss.id]);
    }
    res.redirect("/");
});

module.exports=router;