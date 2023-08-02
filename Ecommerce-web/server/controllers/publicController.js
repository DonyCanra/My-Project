const { Customer, Product, Transaction, History } = require("../models");
const { SignToken } = require("../helpers/jwt");
const { checkPassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("388238736274-dfnk0dalmbsj9slklphjcn56impv7btm.apps.googleusercontent.com");
const axios = require("axios");

class PublicController {
  static async publicRegister(req, res, next) {
    try {
      const { email, password } = req.body;

      const customer = await Customer.create({ email, password });

      res.status(201).json({ access_token: SignToken({ id: customer.id }) });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async publicLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "NameRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const customer = await Customer.findOne({ where: { email } });
      if (!customer) throw { name: "InvalidUser" };

      const isPasswordCorrect = checkPassword(password, customer.password);
      if (!isPasswordCorrect) throw { name: "InvalidUser" };

      res.status(200).json({ access_token: SignToken({ id: customer.id }) });
    } catch (err) {
      next(err);
    }
  }
  static async publicGoogleLogin(req, res, next) {
    try {
      const googleToken = req.headers.google_token;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: "388238736274-dfnk0dalmbsj9slklphjcn56impv7btm.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const email = payload.email;

      const [customer, created] = await Customer.findOrCreate({
        where: { email },
        defaults: { email, password: "Dony Ganteng", role: "customer" },
        hooks: false,
      });

      res.status(created ? 201 : 200).json({ access_token: SignToken({ id: customer.id }) });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async fetchProduct(req, res, next) {
    try {
      const { name, page } = req.query;

      let options = {};

      if (name) {
        options.name = name;
      }
      if (page) {
        options.num = 15;
        options.offset = options.num * page;
      } 
      const { data } = await axios({
        url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
        params: options,
        get: "get",
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async fetchProductDetail(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(+id);

      if (!product) throw { name: "NotFound" };

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async buildQrCode(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `https://api.qr-code-generator.com/v1/create?access-token=dnqxBF7E92PRswkoLPyj2eIrdmwog1dMeetSsePYqGt0NnecWxw_dVvsANaMaeBL`,
        method: `post`,
        data: {
          frame_name: "no-frame",
          qr_code_text: `http://localhost:5173/product/${id}`,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async fetchTransaction(req, res, next) {
    try {
      const { id } = req.customer;
      const transactions = await Transaction.findAll({
        include: [Product, Customer],
        where: { CustomerId: id },
      });

      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  }
  static async addTransaction(req, res, next) {
    try {
      const CustomerId = req.customer.id;
      const ProductId = req.params.productId;
      const updatedBy = req.customer.email;

      const transaction = await Transaction.create({ CustomerId, ProductId });

      await History.create({
        title: `Post Transaction`,
        description: `Buy Product with id ${ProductId}`,
        updatedBy,
      });

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }
  static async cancelTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const updatedBy = req.customer.email;

      const transaction = await Transaction.findByPk(+id);
      if (!transaction) throw { name: "NotFound" };

      await Transaction.destroy({
        where: { id },
        cascade: true,
      });

      await History.create({
        title: `Cancel Transaction`,
        description: `Cancel buy product with id ${id}`,
        updatedBy,
      });

      res.status(200).json({ message: `Bookmark ${id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
  // History Start
  static async historyCustomer(req, res, next) {
    try {
      const updatedBy = req.customer.email;

      const histories = await History.findAll({
        where: { updatedBy },
      });

      res.status(200).json(histories);
    } catch (err) {
      next(err);
    }
  }
  // History End
}

module.exports = PublicController;
