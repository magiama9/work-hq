import axios from "axios";

export default {
  fetchAll: function(userID) {
    console.log(userID);
    return axios.get(`api/jobs/${userID}`);
  },
  fetchByCompany: function(query) {
    return axios.get("/api/jobs/company", { params: { q: query } });
  },
  fetchByTitle: function(query) {
    return axios.get("/api/jobs/title", { params: { q: query } });
  }
};
