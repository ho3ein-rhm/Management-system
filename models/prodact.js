const Sequelize = require("sequelize");

const db = require("../config/db");

const product = db.define(
  "tblproducts",
  {
    idtblproducts: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.TEXT,
    },
    subCategoryID: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    Count: {
      type: Sequelize.INTEGER,
    },
    storeroomID: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = product