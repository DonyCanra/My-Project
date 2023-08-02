const express = require("express");
const MainController = require("../controllers/mainController");
const router = express.Router();

router.get("/", MainController.listCategories);
router.post("/", MainController.addCategory);
router.get("/:id", MainController.listCategoryById);
router.put("/:id", MainController.updateCategory);
router.delete("/:id", MainController.deleteCategory);

module.exports = router;
