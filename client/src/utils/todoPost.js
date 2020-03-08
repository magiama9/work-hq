import axios from "axios";

export default {
  addTodo: function(newTodo) {
    console.log(newTodo);
    return axios.post("api/todos", newTodo);
  },

  updateTodo: function(todoID, updatedTodo) {
    console.log(updatedTodo);
    return axios.put(`api/todos/${todoID}`, updatedTodo);
  }
};
