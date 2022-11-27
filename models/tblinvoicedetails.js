const db = require('../config/db');

const Sequelize = require('sequelize');

const tblinvoicedetails = db.define("tblinvoicedetails", {
  idtblinvoicedetails: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  productsID: {
    type: Sequelize.STRING,
  },
  count: {
      type : Sequelize.INTEGER
  },
  invoiceID: {
      type : Sequelize.INTEGER
  },
  price : {
      type: Sequelize.INTEGER
  }
},
{   
    tableName : "tblinvoicedetails",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = tblinvoicedetails;