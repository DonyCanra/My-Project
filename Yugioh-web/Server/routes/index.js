const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const Controller = require("../controllers/controller");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/", Controller.fetchDatabase);
router.get("/cards", Controller.fetchCard);
router.get("/cards/detail", Controller.fetchDatabaseById);
router.get("/cards/random", Controller.fetchCardRandom);

router.use(authentication);

router.get("/orders", Controller.fetchOrder);
router.post("/orders/:id", Controller.createOrder);
router.patch("/orders/:id", Controller.changeStatusOrder);
router.delete("/orders/:id", Controller.cancelOrder);
router.post("/midtrans-payment/:id", Controller.paymentMidtrans);
router.get("/histories", Controller.fetchHistory);

module.exports = router;
