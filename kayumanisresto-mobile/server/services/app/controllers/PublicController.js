const { Item, Category, User, Ingredient } = require("../models");

class PublicController {
  static async fetchProduct(req, res, next) {
    try {
      const items = await Item.findAll({
        include: [Category, Ingredient],
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
        include: [Category, Ingredient],
        where: { id },
      });

      // console.log(id, "iddd");

      if (!item) throw { name: "NotFound" };
      // console.log(item, "<<<");

      res.status(200).json(item);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;
