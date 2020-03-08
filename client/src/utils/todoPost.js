import axios from "axios";

export default {
  addTodo: function(newJob) {
    console.log(newJob);
    return axios.post("api/todos", newJob);
  },

  updateTodo: function(todoID, updatedTodo) {
    console.log(updatedJob);
    return axios.put(`api/todos/${todoID}`, updatedTodo);
  }
};
