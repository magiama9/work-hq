import axios from "axios";

export default {
  fetchAll: function(userID) {
    console.log(userID);
    return axios.get(`api/materials/${userID}`);
  }
};