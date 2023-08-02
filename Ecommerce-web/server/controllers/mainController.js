const { User, Category, Product, History } = require("../models");

class MainController {
  // User Start
  static async listUsers(req, res, next) {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async user(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(+id);
      if (!user) throw { name: `NotFound` };

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  // User End

  // Category Start
  static async listCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        include: [Product],
      });

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
  static async addCategory(req, res, next) {
    try {
      const updatedBy = req.user.email;
      const { name, imgUrl } = req.body;

      const category = await Category.create({ name, imgUrl });

      await History.create({
        title: category.name,
        description: `New Category with id ${category.id} has been created`,
        updatedBy,
      });

      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }
  static async listCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(+id);

      if (!category) throw { name: "NotFound" };

      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const updatedBy = req.user.email;
      const { name, imgUrl } = req.body;

      const category = await Category.findByPk(+id);
      if (!category) throw { name: "NotFound" };

      await Category.update({ name, imgUrl }, { where: { id: category.id } });

      await History.create({
        title: name,
        description: `Category with id ${id} has been updated`,
        updatedBy,
      });

      res.status(200).json({ message: `Category with id ${id} has been updated` });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const updatedBy = req.user.email;

      const category = await Category.findByPk(+id);
      if (!category) throw { name: "NotFound" };

      await Category.destroy({
        where: { id },
        cascade: true,
      });

      await History.create({
        title: category.name,
        description: `Category with id ${id} has been deleted`,
        updatedBy,
      });

      res.status(200).json({ message: `Category ${id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
  // Category End

  //Product Start
  static async listProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [Category, User],
        order: [["name", "ASC"]],
      });

      const data = JSON.parse(JSON.stringify(products));
      // console.log(req.user);

      const newProducts = data.map((el) => {
        // console.log(req.user.role);
        const isAdmin = req.user.role === "admin";
        const isStaff = req.user.role === "staff" && req.user.id === el.authorId;
        el.canEdit = isAdmin || isStaff;
        return el;
      });

      res.status(200).json(newProducts);
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const authorId = req.user.id;
      const updatedBy = req.user.email;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const product = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId,
      });

      await History.create({
        title: product.name,
        description: `New product with id ${product.id} has been created`,
        updatedBy,
      });

      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async listProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(+id);

      if (!product) throw { name: "NotFound" };

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      const updatedBy = req.user.email;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const findProduct = await Product.findByPk(+id);
      if (!findProduct) throw { name: "NotFound" };

      await Product.update(
        {
          name,
          description,
          price,
          stock,
          imgUrl,
          categoryId,
          authorId,
        },
        { where: { id } }
      );

      await History.create({
        title: name,
        description: `Product with id ${id} has been updated`,
        updatedBy,
      });

      res.status(200).json({ message: `Product with ${id} has been updated` });
    } catch (err) {
      next(err);
    }
  }

  static async modifyProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updatedBy = req.user.email;
      const { status } = req.body;

      console.log(status);

      const product = await Product.findByPk(+id);
      if (!product) throw { name: "NotFound" };

      await Product.update({ status }, { where: { id } });

      await History.create({
        title: product.name,
        description: `Product with id ${id} has been updated status from ${product.status} to ${status}`,
        updatedBy,
      });

      res.status(200).json({ message: `Product ${id} has been modified` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updatedBy = req.user.email;

      const product = await Product.findByPk(+id);
      if (!product) throw { name: "NotFound" };

      await Product.destroy({
        where: { id },
        cascade: true,
      });

      await History.create({
        title: product.name,
        description: `Product with id ${id} has been deleted`,
        updatedBy,
      });

      res.status(200).json({ message: `Product with id ${id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
  // Product End

  // History Start
  static async listHistories(req, res, next) {
    try {
      const histories = await History.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(histories);
    } catch (err) {
      next(err);
    }
  }
  // History End

  // Dashboard Start

  static async dashboard(req, res, next) {
    try {
      const users = await User.findAll();
      const categories = await Category.findAll();
      const products = await Product.findAll();

      const countUser = users.length;
      const countCategory = categories.length;
      const countProduct = products.length;

      res.status(200).json({ countUser, countCategory, countProduct });
    } catch (err) {
      next(err);
    }
  }
  // Dashboard End
}

module.exports = MainController;
