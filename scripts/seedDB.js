const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/work-hq");

const jobSeed = [
  {
    jobID: 1,
    title: "Street View Driver",
    company: "Google",
    status: "interested"
  },
  { jobID: 2, title: "Hype Man", company: "Theranos", status: "interested" },
  {
    jobID: 3,
    title: "Back End Developer",
    company: "Google",
    status: "interested"
  },
  {
    jobID: 4,
    title: "Front End Developer",
    company: "Google",
    status: "applied"
  },
  { jobID: 5, title: "Warehouse Slave", company: "Amazon", status: "applied" },
  { jobID: 6, title: "Moustache Groomer", company: "Apple", status: "responded" },
  { jobID: 7, title: "'Genius'", company: "Apple", status: "interviewing" },
  { jobID: 8, title: "Instructor", company: "2U", status: "interviewing" },
  { jobID: 9, title: "Urban Beekeeper", company: "Hive", status: "offer" },
  { jobID: 10, title: "Alcoholic", company: "Freelance", status: "offer" }
];

db.Jobs.remove({})
  .then(() => db.Jobs.collection.insertMany(jobSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
