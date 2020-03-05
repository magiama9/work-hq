import axios from "axios";

export default {
  fetchAll: function(query) {
    return axios.get("http://localhost:3001/api/jobs");
  },
  fetchByCompany: function(query) {
    return axios.get("/api/jobs/company", { params: { q: query } });
  },
  fetchByTitle: function(query) {
    return axios.get("/api/jobs/title", { params: { q: query } });
  }
};
