import axios from "axios";

export default {

  // Fetches all todos associated with a specific user ID
  fetchAll: function(userID) {
    return axios.get(`api/resources/${userID}`);
  }
};
