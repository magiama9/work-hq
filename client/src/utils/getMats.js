import axios from "axios";

export default {
  fetchAll: function(userID) {
    // GETTING USERID
    return axios.get(`/api/materials/${userID}`);
  }
};