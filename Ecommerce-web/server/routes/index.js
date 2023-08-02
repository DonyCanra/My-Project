const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authentication");
const LoginController = require("../controllers/loginController");
const MainController = require("../controllers/mainController");

router.post("/auth/register", LoginController.register);
router.post("/auth/login", LoginController.login);
router.post("/auth/googleLogin", LoginController.googleLogin);
router.use("/public", require("./customers"));

router.use(authentication);

router.use("/users", require("./users"));
router.use("/categories", require("./categories"));
router.use("/products", require("./products"));
router.use("/histories", require("./histories"));
router.use("/dashboard", MainController.dashboard);

module.exports = router;
