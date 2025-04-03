const { Pool } = require("pg");
require("dotenv").config();



module.exports = new Pool({
    host: "localhost", // or wherever the db is hosted
    user: "hungwn2",
    database: "inventory",
    password: "hibanyin420Z",
    port: 5432 // The default port
  });