const conn = require("./conn");
const { Sequelize } = conn;

const Student = conn.define(
  "student",
  {
    profilePic: {
      type: Sequelize.TEXT
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: "you must enter a first name!"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "you must enter a first name!"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: "you must enter a last name!"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "you must enter a last name!"
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      isUnique: true,
      allowNull: {
        args: false,
        msg: "you must enter an email!"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "you must enter a valid email"
        },
        notEmpty: {
          args: true,
          msg: "you must enter an email!"
        }
      }
    },
    gpa: {
      type: Sequelize.FLOAT,
      validate: {
        isFloat: {
          min: 0.0,
          max: 4.0,
          args: true,
          msg: "Must be a number between 0.0-4.0!"
        }
      }
    }
  },
  {
    getterMethods: {
      name: function() {
        return this.firstName + " " + this.lastName;
      }
    }
  }
);
module.exports = Student;
