const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  // Job title
  resource: {
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
    type: Array,
    default: []
  },
  resourceID: {
    type: String
  },
  userID: {
    type: String
  }
});

const Resources = mongoose.model("Resources", resourceSchema);

module.exports = Resources;
