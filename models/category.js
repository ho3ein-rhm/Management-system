const Sequelize = require("sequelize");
const db = require("../config/db");

const category = db.define(
  "tblcategory",
  {
    categoryID: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = category;
