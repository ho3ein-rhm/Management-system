const Sequelize = require("sequelize");

const db = require("../config/db");

const tblstoreroom = db.define(
  "tblstorerooms",
  {
    storeroomID: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    phoneNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    adress: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    userID: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.CHAR,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = tblstoreroom;
