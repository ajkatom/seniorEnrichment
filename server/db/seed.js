const db = require("./index.js");
const fs = require("fs");
const conn = require("./conn");
const { Student, Campus } = db.models;
const Sequelize = require("sequelize");
const Chance = require("chance");
const chance = new Chance();
const studentArray = [];
const campusArray = [];

for (let j = 0; j < 5; j++) {
  campusArray.push({
    name: `${chance.state({ full: true })} state`,
    picture:
      "https://www.sunshinedaydream.biz/assets/images/buttons/pink-floyd-the-wall-hammers-button.jpg",
    address: chance.address(),
    description: chance.paragraph({ sentences: 1 })
  });
}

for (let i = 0; i < 11; i++) {
  studentArray.push({
    profilePic:
      "https://cdnb.artstation.com/p/assets/images/images/000/287/547/large/89Ilustra1.jpg?1415281882",
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    gpa: chance.floating({ min: 0, max: 4.0, fixed: 2 })
  });
}

const seed = () => {
  return Promise.all(
    campusArray.map(campus => {
      return Campus.create(campus);
    })
  ).then(() =>
    Promise.all(
      studentArray.map(student => {
        return Student.create(student).then(student => {
          Campus.findAll().then(campuses => {
            student.setCampus(Math.floor(Math.random() * campuses.length) + 1);
          });
        });
      })
    )
  );
};

conn
  .sync({ force: true })
  .then(() => console.log("synced"))
  .then(() => seed())
  .then(() => console.log("seeded"))
  .catch(console.error);
