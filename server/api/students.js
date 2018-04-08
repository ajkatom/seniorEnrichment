const express = require("express");
const router = require("express").Router();
const db = require("../db");
const { Student } = db.models;

router.get("/", (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});
router.post("/", (req, res, next) => {
  if (req.body.campusId === -1) req.body.campusId = null;
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
router.put("/:id", (req, res, next) => {
  if (req.body.campusId === -1) req.body.campusId = null;
  Student.findById(req.params.id)
    .then(student => {
      Object.assign(student, req.body);
      return student.save();
    })

    .then(student => res.send(student))
    .catch(next);
});

module.exports = router;
