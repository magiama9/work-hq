const router = require("express").Router();
const db = require("../models");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
var dotenv = require('dotenv');

dotenv.load();

// Get route for fetching a user's saved jobs
router.get("/jobs/:uid", (req, res) => {
  console.log(req.params.uid);
  db.Jobs.find({ userID: req.params.uid, status: { $ne: "deleted" } })
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
    {
      status: req.body.status,
      title: req.body.title,
      company: req.body.company,
      href: req.body.href,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location
    }
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
    // .select("resume -_id")
    .distinct("resume")
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

router.get("/resources/:uid", (req, res) => {
  db.Resources.find({ userID: req.params.uid })
    // .select("resume -_id")
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
// Put route for updating todos in the dashboard
router.put("/resources/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  db.Resources.findOneAndUpdate(
    { resourceID: req.params.id },
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

// resources post route for adding resources
router.post("/resources", (req, res) => {
  console.log(req.body);
  db.Resources.findOneAndUpdate(
    { resource: req.body.resource, status: req.body.status },
    req.body,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  res.send("complete");
});

// Todo post route for adding todos
router.post("/resources", (req, res) => {
  console.log(req.body);
  db.Resources.findOneAndUpdate(
    { resource: req.body.resource, status: req.body.status },
    req.body,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  res.send("complete");
});

router.post("/resources/resume", (req, res) => {
  console.log(req.body);
  db.Resources.findOneAndUpdate(
    { resource: req.body.resource, status: "resume" },
    req.body,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  res.send("complete");
});

router.get("/resources/upload", secured(), (req, res) => {
  res.render("resourceupload");
});

// POST ROUTE FOR ADDING resources
// ROUTE IS SECURED. POST WILL FAIL IF USER IS NOT LOGGED IN
router.post("/resources/upload", upload.single("photo"), (req, res, next) => {
  // req.file is the `photo` file
  // req.body holds the text fields of the form
  console.log("POST ROUTE HIT")
  // stores the req.body as a new object
  let obj = req.body;

  // initializes filepath variable
  let filepath;
  // // Sets the img property of the new object to a filepath
  // obj.img = filepath2;
  if (typeof req.file != "undefined") {
    obj.img = req.file.location;
  }

  // Adds an item to the database.
  query.addItem(obj);

  // ADDING THE # MAKES THE BROWSER LOAD AN UNCACHED VERSION. OR AT LEAST IT SEEMS TO
  res.redirect("/resources/#");
});

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2"
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "shopdesk-fjord",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = router;
