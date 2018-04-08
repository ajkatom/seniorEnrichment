const conn = require("./conn");
const { Sequlize } = conn;
const Campus = require("./campus");
const Student = require("./student");

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  models: {
    Student,
    Campus
  }
};
