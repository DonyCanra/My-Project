const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.wellcomeCustomer);
router.get("/transaction", Controller.transactionCustomer);
router.get("/transaction/:transactionId/detail", Controller.transactionDetailCustomer);
router.get("/:id", Controller.listProduct);
router.get("/:id/checkout/:productId", Controller.checkout);

module.exports = router;
