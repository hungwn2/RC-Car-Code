const express = require("express");
const app1 = express();
const path=require("node:path")
app1.set("views", path.join(__dirname, "views"));
app1.set("view engine", "ejs");


app1.get("/", (req, res) => {
    res.render("index", { message: "EJS rocks!" });
  });
  