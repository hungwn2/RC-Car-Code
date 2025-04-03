const express = require('express');
const app = express();
const path = require('node:path');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.js
const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
  ];
  
  app.get("/", (req, res) => {
    res.render("index", { links: links });
  });
  
  const port = 3000; // Or any other port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});