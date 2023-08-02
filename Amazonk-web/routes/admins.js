const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.productAdmin);
router.get("/empty", Controller.emptyProduct);
router.get("/add", Controller.addProduct);
router.post("/add", Controller.createProduct);
router.get("/transaction", Controller.listTransaction);
router.get("/transaction/:transactionId/detail", Controller.transactionDetail);
router.get("/:adminId/restock", Controller.editProduct);
router.post("/:adminId/restock", Controller.restockProduct);
router.get("/:adminId/delete", Controller.deleteProduct);
router.get("/:adminId/send/:productId/success", Controller.successTransaction);
router.get("/:adminId/send/:productId/cancel", Controller.cancelTransaction);

module.exports = router;
