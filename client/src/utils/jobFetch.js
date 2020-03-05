import axios from "axios";

export default {
  fetchAll: function() {
    return axios.get("api/jobs");
  },
  fetchByCompany: function(query) {
    return axios.get("/api/jobs/company", { params: { q: query } });
  },
  fetchByTitle: function(query) {
    return axios.get("/api/jobs/title", { params: { q: query } });
  }
};
