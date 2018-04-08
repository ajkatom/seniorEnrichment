const conn = require("./conn");
const { Sequelize } = conn;
const { Sequlize } = conn;

const Campus = conn.define("campus", {
  name: Sequelize.STRING,
  picture: Sequelize.TEXT,
  address: Sequelize.STRING,
  description: Sequelize.TEXT
});
module.exports = Campus;
