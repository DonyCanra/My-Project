const { Item, Category, User, Ingredient } = require("../models");

class PublicController {
  static async fetchProduct(req, res, next) {
    try {
      const items = await Item.findAll({
        include: [Category, User],
        order: [["name", "ASC"]],
      });

      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  }

  static async fetchProductDetail(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Item.findOne({
        include: [User, Category, Ingredient],
        where: { id },
      });

      if (!item) throw { name: "NotFound" };

      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;
