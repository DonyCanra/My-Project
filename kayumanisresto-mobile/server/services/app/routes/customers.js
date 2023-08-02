const express = require("express");
const PublicController = require("../controllers/PublicController");
const router = express.Router();


router.get("/items", PublicController.fetchProduct);
router.get("/items/:id", PublicController.fetchProductDetail);


module.exports = router;
