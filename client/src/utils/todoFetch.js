import axios from "axios";

export default {

  // Fetches all todos associated with a specific user ID
  fetchAll: function(userID) {
    console.log(userID);
    return axios.get(`api/todos/${userID}`);
  }
};
