import axios from "axios";

export default {

  // Returns all jobs associated with the user's ID
  fetchAll: function(userID) {
    console.log(userID);
    return axios.get(`api/jobs/${userID}`);
  },

  // Fetches jobs by company
  // SERVER ROUTE NOT YET SETUP
  fetchByCompany: function(query) {
    return axios.get("/api/jobs/company", { params: { q: query } });
  },

  // Fetches jobs by title
  // SERVER ROUTE NOT YET SETUP
  fetchByTitle: function(query) {
    return axios.get("/api/jobs/title", { params: { q: query } });
  }
};
