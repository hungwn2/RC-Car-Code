const express = require("express");
const app = express();
const authorRoutes = require("./routes/authorRoutes");

app.set("view engine", "ejs"); // Use EJS for rendering views

app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Middleware for form data

app.use("/authors", authorRoutes); // Mount the author routes

// Default route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the Authors API!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
