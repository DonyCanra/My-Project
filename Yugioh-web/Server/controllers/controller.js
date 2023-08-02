const { ComparePassword } = require("../helpers/bcrypt");
const { SignToken } = require("../helpers/jwt");
const { Player, Card, Order, History } = require("../models");
const midtransClient = require("midtrans-client");
const axios = require("axios");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const player = await Player.create({ email, password });

      res.status(201).json({
        access_token: SignToken({ id: player.id }),
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "InvalidName" };
      if (!password) throw { name: "InvalidPassword" };

      const customer = await Player.findOne({ where: { email } });
      if (!customer) throw { name: "InvalidUser" };

      const isPasswordCorrect = ComparePassword(password, customer.password);
      if (!isPasswordCorrect) throw { name: "InvalidUser" };

      res.status(200).json({ access_token: SignToken({ id: customer.id }) });
    } catch (err) {
      next(err);
    }
  }
  static async fetchDatabase(req, res, next) {
    try {
      const { name, page } = req.query;

      let options = {};

      if (name) {
        options.name = name;
      } else if (page) {
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
  static async fetchDatabaseById(req, res, next) {
    try {
      const { id } = req.query;

      const { data } = await axios({
        url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
        params: { id },
        get: "get",
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async fetchCardRandom(req, res, next) {
    try {
      const { data } = await axios({
        url: "https://db.ygoprodeck.com/api/v7/randomcard.php",
        get: "get",
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async fetchCard(req, res, next) {
    try {
      const cards = await Card.findAll();

      res.status(200).json(cards);
    } catch (err) {
      next(err);
    }
  }

  static async fetchOrder(req, res, next) {
    try {
      const { id } = req.player;
      const orders = await Order.findAll({
        include: [Player, Card],
        where: { PlayerId: id },
      });

      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }
  static async createOrder(req, res, next) {
    try {
      const PlayerId = req.player.id;
      const CardId = req.params.id;
      const updatedBy = req.player.email;

      const order = await Order.create({ PlayerId, CardId });

      await History.create({
        description: `New order with id ${CardId} created, please payment!`,
        updatedBy,
      });

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async changeStatusOrder(req, res, next) {
    try {
      const { id } = req.params;
      const updatedBy = req.player.email;

      const order = await Order.findByPk(+id);
      if (!order) throw { name: "NotFound" };

      await Order.update({ status: "Success" }, { where: { id } });

      await History.create({
        description: `Payment order product with id ${id} success`,
        updatedBy,
      });

      res.status(200).json({ message: `Card with id ${id} has been send` });
    } catch (err) {
      next(err);
    }
  }

  static async cancelOrder(req, res, next) {
    try {
      const { id } = req.params;
      const updatedBy = req.player.email;

      const order = await Order.findByPk(+id);
      if (!order) throw { name: "NotFound" };

      await Order.destroy({
        where: { id: order.id },
        cascade: true,
      });

      await History.create({
        description: `Cancel order product with id ${id}`,
        updatedBy,
      });

      res.status(200).json({ message: `Order ${id} has been cancel` });
    } catch (err) {
      next(err);
    }
  }

  static async paymentMidtrans(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(+id, {
        include: [Player, Card],
      });
      if (!order) throw { name: NotFound };

      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: Math.floor(100000 * Math.random() + 800000),
          gross_amount: order.Card.price * 16000,
        },
        credit_card: {
          secure: true,
        },
        transactions_details: {
          email: order.Player.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      // console.log(midtransToken, "<<<");

      res.status(200).json(midtransToken);
    } catch (err) {
      next(err);
    }
  }
  // History Start
  static async fetchHistory(req, res, next) {
    try {
      const updatedBy = req.player.email;

      const histories = await History.findAll({
        where: { updatedBy },
      });

      res.status(200).json(histories);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
