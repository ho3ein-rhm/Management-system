// const mysql = require('mysql');


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "hossein",
//   password: "hossein1377",
//   database: "accounting_db",
// });

// module.exports = con;

const { Sequelize } = require("sequelize");

module.exports = new Sequelize("accounting_db", "hossein", "hossein1377", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
