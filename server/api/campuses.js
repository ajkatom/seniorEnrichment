const express = require("express");
const router = require("express").Router();
const db = require("../db");
const { Campus } = db.models;

router.get("/", (req, res, next) => {
  Campus.findAll()
    .then(campuses => {
      res.send(campuses);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.send(campus))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => campus.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
