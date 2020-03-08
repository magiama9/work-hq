const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // Job title
  todoItem: {
    type: String,
    required: true
  },
  // Company Name
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "interested"
  },
  todoID: {
    type: String
  },
  userID: {
    type: String
  }
});

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
