const express = require("express");
const MainController = require("../controllers/mainController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.get("/", MainController.listUsers);
router.get("/profile", authentication, MainController.user);

module.exports = router;
 