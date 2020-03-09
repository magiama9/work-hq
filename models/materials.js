const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // Job title
  itemLink: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "resume"
  },
  jobIDArray: {
    type: Array
  },
  userID: {
    type: String
  }
});

const Materials = mongoose.model("Todos", todoSchema);

module.exports = Materials;
