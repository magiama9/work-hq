import axios from "axios";

export default {
  addJob: function(newJob) {
    console.log(newJob);
    return axios.post("api/jobs", newJob);
  },

  updateJob: function(jobID, updatedJob) {
    console.log(updatedJob);
    return axios.put(`api/jobs/${jobID}`, updatedJob);
  }
};
