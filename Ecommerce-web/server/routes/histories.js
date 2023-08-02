const express = require("express");
const MainController = require("../controllers/mainController");
const router = express.Router();

router.get("/", MainController.listHistories);

module.exports = router;
