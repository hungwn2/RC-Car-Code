const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.index);
router.get("/new", indexController.newMessage);
router.post("/new", indexController.createMessage);

module.exports = router;