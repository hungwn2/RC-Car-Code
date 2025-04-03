// filepath: c:\Users\User\NodeJs\mini-message-boards\app.js
// filepath: c:\Users\User\NodeJs\mini-message-boards\app.js
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const indexRouter = require("./routes/index"); // Changed from messagesRouter
app.use("/", indexRouter); // Use the index router

app.use((req, res, next) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error occurred');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});