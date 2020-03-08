import axios from "axios";

export default {
  fetchAll: function(userID) {
    return axios.get(`/api/materials/${userID}`);
  }
};