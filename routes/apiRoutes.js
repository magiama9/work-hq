const router = require("express").Router();
const db = require("../models");

router.get("/jobs/:uid", (req, res) => {
  console.log(req.params.uid)
  db.Jobs.find({ userID: req.params.uid })
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

router.put("/jobs/:id", (req, res) => {
  console.log(req.body);
  db.Jobs.findOneAndUpdate(
    { jobID: req.params.id },
    { status: req.body.status }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  res.send("complete");
});

router.get("/materials/:uid", (req, res) => {
  db.Jobs.find({ userID: req.params.uid })
    // .distinct("resume")
    .then((err, response) => {
      if (err) console.error(err);
      //CONSOLE LOGGING JOBS
      console.log(response);
    });
    // db.Jobs.find({ userID: req.params.uid })
    // .distinct("coverLetter")
    // .then((err, response) => {
    //   if (err) console.error(err);
    //   // console.log(response);
    // });
});

module.exports = router;
