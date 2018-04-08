const conn = require("./conn");
const { Sequelize } = conn;

const Student = conn.define(
  "student",
  {
    profilePic: {
      type: Sequelize.TEXT,
      validate: {
        isUrl: true
      }
    },
    firstName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "you must enter first name!"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "you must enter last name!"
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: true
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
