"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.hasMany(models.Order)
    }
  }
  Player.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Email must been unique`,
        },
        validate: {
          notEmpty: {
            msg: `Email is required`,
          },
          notNull: {
            msg: `Email is required`,
          },
          isEmail: {
            args: true,
            msg: `Format email is wrong`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Password is required`,
          },
          notNull: {
            msg: `Password is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  Player.beforeCreate("addPlayer", (player) => {
    player.password = hashPassword(player.password)
  });
  return Player;
};
