let { User } = require("../models");
const bcrypt = require("bcryptjs")

class UserController {
  static renderRegister(req, res) {
    res.render("signupPage");
  }
  static renderLogin(req, res) {
    res.render("loginPage");
  }

  static handlerRegister(req, res) {
    const { name, gender, email, password, role } = req.body;
    // console.log(req.body);
    User.create({ name, gender, email, password, role })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static handlerLogin (req, res) {
    const {email, password} = req.body

    User.findOne({ where: { email } })
    .then((user) => {
        if (user) {
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (isValidPassword) {
                req.session.userId = user.id
                req.session.role = user.role
                req.session.email = user.email

                if (user.role === 'admin') {
                  return res.redirect('/admins')
                } else if (user.role === 'customer') {
                  return res.redirect('/customers')
                } else {
                  res.redirect('/login')
                }
            } else {
                const error =   "invalid password"
                return res.redirect(`/login?error=${error}`)
            }
        } else {
            const error =   "invalid email"
            return res.redirect(`/login?error=${error}`)
        }
    })
    .catch((err) => {
        res.send(err)
    })
}
}

module.exports = UserController;
