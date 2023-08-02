"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Player);
      Order.belongsTo(models.Card);
    }
  }
  Order.init(
    {
      PlayerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending"
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  // Order.beforeCreate((order) => {
  //   order.status = "Pending";
  // });
  return Order;
};
