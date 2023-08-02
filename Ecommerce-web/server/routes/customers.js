const express = require("express");
const { authenticationCustomer } = require("../middlewares/authentication");
const PublicController = require("../controllers/publicController");
const router = express.Router();

router.post("/register", PublicController.publicRegister);
router.post("/login", PublicController.publicLogin);
router.post("/googleLogin", PublicController.publicGoogleLogin);

router.get("/products", PublicController.fetchProduct);
router.get("/products/:id", PublicController.fetchProductDetail);
router.post('/products/qr/:id', PublicController.buildQrCode)

router.use(authenticationCustomer);
router.get("/transactions", PublicController.fetchTransaction);
router.post("/transactions/:productId", PublicController.addTransaction);
router.delete("/transactions/:id", PublicController.cancelTransaction);
router.get("/histories", PublicController.historyCustomer);

module.exports = router;
