const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/work-hq");

const jobSeed = [
  {
    _id: 1,
    title: "Street View Driver",
    company: "Google",
    status: "interested"
  },
  { _id: 2, title: "Hype Man", company: "Theranos", status: "interested" },
  {
    _id: 3,
    title: "Back End Developer",
    company: "Google",
    status: "interested"
  },
  {
    _id: 4,
    title: "Front End Developer",
    company: "Google",
    status: "applied"
  },
  { _id: 5, title: "Warehouse Slave", company: "Amazon", status: "applied" },
  { _id: 6, title: "Moustache Groomer", company: "Apple", status: "responded" },
  { _id: 7, title: "'Genius'", company: "Apple", status: "interviewing" },
  { _id: 8, title: "Instructor", company: "2U", status: "interviewing" },
  { _id: 9, title: "Urban Beekeeper", company: "Hive", status: "offer" },
  { _id: 10, title: "Alcoholic", company: "Freelance", status: "offer" }
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
