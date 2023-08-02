"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
    }
    formatDate() {
      let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      return this.TransactionDate.toLocaleDateString("id-ID", options);
    }
  }
  Transaction.init(
    {
      UserId: DataTypes.INTEGER,
      TransactionDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
