const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const session = require("express-session");
const UserController = require("../controllers/userController");

router.use(
  session({
    secret: "ini session amazonk",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

router.get("/register", UserController.renderRegister);
router.post("/register", UserController.handlerRegister);

router.get("/login", UserController.renderLogin);
router.post("/login", UserController.handlerLogin);

router.get("/navbar/:id", Controller.navbar);

router.use((req, res, next) => {
  console.log(req.session)
  if (!req.session.userId) {
    const error = 'Login First!'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
});

const isCustomer = (req, res, next) => {
  console.log(req.session)
  if (req.session.role !== 'customer') {
    const error = 'You are not allowed here!'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
}

router.use("/customers", isCustomer, require("./customers"));

router.use((req, res, next) => {
  console.log(req.session)
  if (req.session.userId && req.session.role !== 'admin') {
    const error = `You aren't allowed here!`
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
});

router.use("/admins", require("./admins"));

module.exports = router;
