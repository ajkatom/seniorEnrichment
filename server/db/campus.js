const conn = require("./conn");
const { Sequelize } = conn;
const { Sequlize } = conn;

const Campus = conn.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: "you must enter name!"
    },
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "you must enter name!"
      }
    }
  },
  picture: {
    type: Sequelize.TEXT
  },
  address: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: "you must enter name!"
    },
    validate: {
      notEmpty: {
        args: true,
        msg: "you must enter addres!"
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: {
      args: false,
      msg: "you must enter name!"
    },
    validate: {
      notEmpty: {
        arg: true,
        msg: "you must enter a description"
      }
    }
  }
});
module.exports = Campus;
