const express = require("express");
const router = express.Router();
const { putAuthorization, patchAuthorization } = require("../middlewares/authorization");
const MainController = require("../controllers/mainController");

router.get("/", MainController.listProducts);
router.post("/", MainController.createProduct);
router.get("/:id", MainController.listProductById);
router.put("/:id", putAuthorization, MainController.updateProduct);
router.patch("/:id", patchAuthorization, MainController.modifyProduct);
router.delete("/:id", MainController.deleteProduct);

module.exports = router;
