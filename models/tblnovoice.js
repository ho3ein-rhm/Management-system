const db = require("../config/db");

const Sequelize = require("sequelize");
const { type } = require("express/lib/response");

const tblnovoice = db.define(
  "tblnovoice",
  {
    inoviceID: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    totalAmount: {
      type: Sequelize.INTEGER,
    },
    userID: {
      type: Sequelize.INTEGER,
    },
    statusID: {
      type: Sequelize.INTEGER,
    },
    BuyerID: { type: Sequelize.INTEGER },
  },
  {
    tableName: "tblnovoice",
    timestamps: false,
    updatedAt: false,
  }
);

module.exports = tblnovoice;
