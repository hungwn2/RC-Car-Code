const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const pool = require("../db/pool");
const router = express.Router();

router.get("/register", (req, res)=>res/render("register"));
router.post("/register", async(req, res)=>{
    const {username, password}=req.body;
    const hash=await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)",[username, hash]);
    res.redirect("/login");
});

router.get("/login", (req, res)=>res.render("login"));
router.post("/login", passport.authenticate("local", {
    successRedirect:"/",
    failureRedirect:"/login"
}));
router.post("/logout", (req, res)=>{
    req.logout(err=>{
        if(err) return next(err);
        res.redirect("/login");
    });
});
router.post("/join", async (req, res) => {
    if (req.body.code === "clubcode") {
      await pool.query("UPDATE users SET is_member = TRUE WHERE id = $1", [req.user.id]);
    }
    res.redirect("/");
  });
  
  module.exports = router;