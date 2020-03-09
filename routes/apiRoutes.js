const router = require("express").Router();
const db = require("../models");

// Get route for fetching a user's saved jobs
router.get("/jobs/:uid", (req, res) => {
  console.log(req.params.uid);
  db.Jobs.find({ userID: req.params.uid })
    .then(jobs => res.json(jobs))
    .catch(err => res.status(422).end());
});

// Todo get route for fetching a user's todos
router.get("/todos/:uid", (req, res) => {
  console.log(req.params.uid);
  db.Todos.find({ userID: req.params.uid })
    .then(todos => res.json(todos))
    .catch(err => res.status(422).end());
});

// Todo post route for adding todos
router.post("/todos", (req, res) => {
  console.log(req.body);
  db.Todos.create(req.body)
    .then(updated => {
      console.log(updated);
      res.json(updated);
    })
    .catch(err => {
      console.error(err);
    });
});

// Post route for adding jobs to the dashboard
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

// Put route for updating jobs in the dashboard
router.put("/jobs/:id", (req, res) => {
  console.log(req.body);
  db.Jobs.findOneAndUpdate(
    { jobID: req.params.id },
    { status: req.body.status, title:req.body.title, company:req.body.company, href:req.body.href, description: req.body.description, salary:req.body.salary, location:req.body.location }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  res.send("complete");
});

// Put route for updating todos in the dashboard
router.put("/todos/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  db.Todos.findOneAndUpdate(
    { todoID: req.params.id },
    { status: req.body.status, description: req.body.description }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  res.send("complete");
});

// Get route for materials
router.get("/materials/:uid", (req, res) => {
  db.Jobs.find({ userID: req.params.uid })

    .select("resume -_id")
    // .distinct("resume")
    .then(items => {
      //CONSOLE LOGGING JOBS
      res.json(items);
    })
    .catch(error => {
      console.error(error);
    });
  // db.Jobs.find({ userID: req.params.uid })
  // .distinct("coverLetter")
  // .then((err, response) => {
  //   if (err) console.error(err);
  //   // console.log(response);
  // });
});

module.exports = router;
