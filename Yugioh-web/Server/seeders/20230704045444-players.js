"use strict";
const fs = require("fs");
const { HashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync("./data/players.json", "utf-8")).map((el) => {
      el.password = HashPassword(el.password)
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Players", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Players", null, {});
  },
};
