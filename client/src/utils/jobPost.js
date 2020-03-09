import axios from "axios";

export default {

  // Post route to add jobs to the dashboard
  addJob: function(newJob) {
    console.log(newJob);
    return axios.post("api/jobs", newJob);
  },

  // Put route to update a job
  // Called when:
  // Job is moved across the board
  // Job is edited in the modal
  // Job is deleted
  updateJob: function(jobID, updatedJob) {
    console.log(updatedJob);
    return axios.put(`api/jobs/${jobID}`, updatedJob);
  }
};
