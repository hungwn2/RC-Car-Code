const pool = require('../db');

const index = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    const messages = result.rows;
    res.render("index", { title: "Mini Message Board", messages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving messages");
  }
};

const newMessage = (req, res) => {
  res.render("form", { title: "New Message", content: "" });
};

const createMessage = async (req, res) => {
  try {
    const { text, user } = req.body;
    await pool.query('INSERT INTO messages (text, user, added) VALUES ($1, $2, NOW())', [text, user]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating message");
  }
};

module.exports = { index, newMessage, createMessage };