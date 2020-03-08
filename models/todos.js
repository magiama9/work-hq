const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // Job title
  todo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "todo"
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
