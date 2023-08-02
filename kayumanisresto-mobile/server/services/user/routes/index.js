const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.get("/users", UserController.findAll);
router.get("/users/:userId", UserController.findById);
router.post("/users", UserController.createUser);
router.delete("/users", UserController.deleteUser);

module.exports = router;
