const Sequelize = require("sequelize");

const db = require("../config/db");

const tbluser = db.define(
  "tblusers",
  {
    name: {
      type: Sequelize.STRING,
    },
    userNamr: {
      type: Sequelize.STRING,
    },
    adress: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.INTEGER,
    },
    password: {
      type: Sequelize.STRING,
    },
    userID: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = tbluser;
