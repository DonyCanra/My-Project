const convertToRupiah = require("../helpers/formatter");
let { Category, Product, Wallet, User, Transaction, TransactionDetail } = require("../models");
const easyinvoice = require('easyinvoice')
const { Op } = require("sequelize");

class Controller {
  static navbar(req, res) {
    const { id } = req.params;
    User.findByPk(+id, {
      include: Wallet,
    })
      .then((user) => {
        // res.send(user)
        res.render("_navbarUser", { user, convertToRupiah });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static productAdmin(req, res) {
    const { sortByName, sortByPrice, filterByCategory, product } = req.query;

    let options = {};
    if (sortByName) options.order = [["name", "ASC"]];
    else if (sortByPrice) options.order = [["price", "ASC"]];
    else if (filterByCategory) options.where = { CategoryId: filterByCategory };

    options.where = { stock: { [Op.gt]: 0 } };

    Product.findAll(options)
      .then((admins) => {
        res.render("admins", { admins, convertToRupiah, product });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static emptyProduct(req, res) {
    Product.listEmpty()
      .then((admins) => res.render("emptyProduct", { admins, convertToRupiah }))
      .catch((err) => res.send(err));
  }
  static addProduct(req, res) {
    const { errors } = req.query;
    Category.findAll()
      .then((categories) => {
        res.render("addProduct", { categories, errors });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static createProduct(req, res) {
    const { name, price, imgUrl, stock, CategoryId } = req.body;
    Product.create({ name, price, imgUrl, stock, CategoryId })
      .then(() => {
        res.redirect("/admins");
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const errors = err.errors.map((el) => {
            return el.message;
          });
          res.redirect(`/admins/add?errors=${errors}`);
          // res.send(errors);
        } else {
          res.send(err);
        }
      });
  }
  static listTransaction(req, res) {
    Transaction.findAll({
      include: User,
    })
      .then((transaction) => {
        res.render("transaction", { transaction });
        // res.send(transaction)
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static transactionDetail(req, res) {
    const { transactionId } = req.params;
    TransactionDetail.findByPk(+transactionId, {
      include: [Product, Transaction],
    })
      .then((transactions) => {
        // res.send(transactions)
        res.render("transactionDetail", { transactions, convertToRupiah });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static editProduct(req, res) {
    const { adminId } = req.params;
    Product.findByPk(+adminId)
      .then((admin) => {
        res.render("editProductStock", { admin });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static restockProduct(req, res) {
    const { adminId } = req.params;
    const { stock } = req.body;
    Product.update({ stock }, { where: { id: adminId } })
      .then(() => {
        res.redirect("/admins");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static deleteProduct(req, res) {
    const { adminId } = req.params;
    let data;
    Product.findByPk(+adminId)
      .then((product) => {
        // res.send(product);
        data = product;
        return Product.destroy({
          where: { id: adminId },
        });
      })
      .then(() => {
        res.redirect(`/admins?product=${data.name}`);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static successTransaction(req, res) {
    const { transactionId, productId } = req.params;
    Transaction.update({ status: "Success" }, { where: { id: productId } })
      .then(() => {
        res.redirect(`/admins/transaction/${transactionId}/details`);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static cancelTransaction(req, res) {
    const { transactionId, productId } = req.params;
    Transaction.update({ status: "Cancel" }, { where: { id: productId } })
      .then(() => {
        res.redirect(`/admins/transaction/${transactionId}/details`);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static wellcomeCustomer(req, res) {
    Category.findAll()
      .then((categories) => {
        res.render("categories", { categories });
        // res.send(categories)
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static listProduct(req, res) {
    const { id } = req.params;
    Category.findByPk(+id, {
      include: Product,
      where: {
        stock: {
          [Op.gt]: 0,
        },
      },
    })
      .then((customers) => {
        res.render("customers", { customers, convertToRupiah });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static checkout(req, res) {
    const { id, productId } = req.params;
    console.log(req.params);
    Product.decrement(
      {
        stock: 1,
      },
      { where: { id: productId } }
    )
      .then(() => res.redirect(`/customers/${id}`))
      .catch((err) => res.send(err));
  }
  static transactionCustomer(req, res) {
    Transaction.findAll({
      include: User,
    })
      .then((transaction) => {
        res.render("transactionCustomer", { transaction });
        // res.send(transaction)
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static transactionDetailCustomer(req, res) {
    const { transactionId } = req.params;
    TransactionDetail.findByPk(+transactionId, {
      include: [Product, Transaction],
    })
      .then((transactions) => {
        const invoiceData = {
          documentTitle: 'Amazonk Invoice',
          currency: 'IDR',
          taxNotation: 6,
          marginTop: 25,
          marginRight: 25,
          marginLeft: 25,
          marginBottom: 25,
          sender: {
            company: 'AmaZonk',
            address: 'Ruang EE Hacktiv8',
            zip: '12345',
            phone: '+123456789',
            email: 'amazonkshop@gmail.com',
          },
          client: {
            company: 'Buyer',
            address: 'Rumah Masing-Masing',
            zip: '67890',
            phone: '+987654321',
            email: 'buyer@amazonk.com',
          }, 
          information: {
            number: "2021.0001/AMZNK/INVC",
            date: (transactions.Transaction.createdAt).toLocaleDateString(),
            "due-date": "Tommorow"
        },
          products: [
            {
              quantity: 1,
              description: transactions.Product.name,
              "tax-rate": 6,
              price: transactions.Product.price,
            },
          ],
          bottomNotice: 'Thank you for your business.',
        };
  
        easyinvoice.createInvoice(invoiceData, (result) => {
          // result is an object containing the generated PDF data
          const pdfBuffer = Buffer.from(result.pdf, 'base64');
          res.contentType('application/pdf');
          res.send(pdfBuffer);
        });
      })
      .catch((err) => {
        console.log(err)
        res.send(err);
      });
  }
}

module.exports = Controller;
