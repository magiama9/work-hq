const router = require("express").Router();
const db = require("../models");

router.get("/jobs", (req, res) => {
  db.Jobs.find({})
    .then(jobs => res.json(jobs))
    .catch(err => res.status(422).end());
});

router.post("/jobs", (req, res) => {
  console.log(req.body);
  db.Jobs.create(req.body)
    .then(updated => {
      console.log(updated);
      res.json(updated);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
