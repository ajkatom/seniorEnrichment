const conn = require("./conn");
const { Sequelize } = conn;
const { Sequlize } = conn;

const Campus = conn.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "campus already exists"
    },
    validate: {
      notEmpty: {
        args: true,
        msg: "name cannot be empty"
      }
    }
  },
  picture: {
    type: Sequelize.TEXT
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,

    validate: {
      notEmpty: {
        args: true,
        msg: "address cannot be empty"
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "must describe the campus"
      }
    }
  }
});
module.exports = Campus;
