import axios from "axios";

export default {

  // Post route to add todos
  addTodo: function(newTodo) {
    console.log(newTodo);
    return axios.post("api/todos", newTodo);
  },

  // Put route to update todos
  // Called when:
  // Todo is moved across the board
  // Todo is edited in the modal
  // Todo is deleted
  updateTodo: function(todoID, updatedTodo) {
    console.log(updatedTodo);
    return axios.put(`api/todos/${todoID}`, updatedTodo);
  }
};
