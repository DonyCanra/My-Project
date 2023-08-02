const { Product } = require("../models");

const putAuthorization = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    const productId = req.params.id;

    const product = await Product.findByPk(+productId);
    if (!product) throw { name: "NotFound" };

    if (role !== "admin" && id !== product.authorId) throw { name: "Forbidden" };

    next();
  } catch (err) {
    next(err);
  }
};
const patchAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user;
    const productId = req.params.id;

    const product = await Product.findByPk(+productId);
    if (!product) throw { name: "NotFound" };

    if (role !== "admin") throw { name: "Forbidden" };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { putAuthorization, patchAuthorization };
