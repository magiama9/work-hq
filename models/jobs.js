const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  // Job title
  title: {
    type: String,
    required: true
  },
  // Company Name
  company: {
    type: String,
    default: ""
  },
  // Job Descriptions
  description: {
    type: String,
    default: ""
  },
  // URL for job posting
  href: {
    type: String,
    default: ""
  },

  // Salary
  salary: {
    type: String,
    default: ""
  },

  // Location
  location: {
    type: String,
    default: ""
  },

  //contact Email
  contactEmail: {
    type: String,
    default: ""
  },

  //cover letter link
  coverLetter: {
    type: String,
    default: ""
  },

  //resume link
  resume: {
    type: String,
    default: ""
  },

  // Job status -- should match status that is used in react front-end
  status: {
    type: String,
    default: "interested"
  },
  jobID: {
    type: String
  },

  userID: {
    type: String
  }
});

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
