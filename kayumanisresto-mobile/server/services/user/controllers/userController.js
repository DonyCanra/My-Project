const User = require("../models/users");

class UserController {
  static async findAll(req, res, next) {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async findById(req, res, next) {
    try {
      const user = await User.findById(req.params.userId);
      console.log(user, "<<");

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(200).json({ newUser });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
