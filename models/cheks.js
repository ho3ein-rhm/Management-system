const db = require('../config/db');

const Sequelize = require('sequelize');

exports.cheks = db.define(
  "tblcheks",
  {
    checkID: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    tittle: {
      type: Sequelize.TEXT,
    },
    date: { type: Sequelize.TEXT },
    amount: { type: Sequelize.INTEGER },
    paymentTo: { type: Sequelize.TEXT },
    status: { type: Sequelize.INTEGER },
    userID: { type: Sequelize.INTEGER },
  },
  {
    tableName: "tblcheks",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);