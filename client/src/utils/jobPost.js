import axios from "axios";

export default {
  addJob: function(newJob) {
    console.log(newJob);
    return axios.post("http://localhost:3001/api/jobs", newJob);
  },

  updateJob: function(jobID, updatedJob) {
    return axios.put(`http://localhost/3001/api/jobs/${jobID}`, updatedJob);
  }
};
