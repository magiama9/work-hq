import axios from "axios";

export default {
  deleteJob: function(jobID, deletedJob) {
    console.log(deletedJob);
    return axios.put(`api/jobs/${jobID}`, deletedJob);
  }
};