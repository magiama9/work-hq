const router = require("express").Router();
const db = require("../models");

router.get("/jobs", (req, res) => {
  db.Jobs.find({})
    .then(jobs => res.json(jobs))
    .catch(err => res.status(422).end());
});

module.exports = router;
