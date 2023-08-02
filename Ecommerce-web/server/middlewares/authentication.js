const { verifyToken } = require("../helpers/jwt");
const { User, Customer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    const decoded = verifyToken(access_token);
    const user = await User.findOne({
      where: { id: decoded.id },
    });

    if (!user) throw { name: "InvalidToken" };

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
const authenticationCustomer = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    const decoded = verifyToken(access_token);
    const customer = await Customer.findOne({
      where: { id: decoded.id },
    });

    if (!customer) throw { name: "InvalidToken" };

    req.customer = customer;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authentication,
  authenticationCustomer,
};
