import axios from "axios";

export default {

  // Post route to add Resources
  addResource: function(newResource) {
    console.log(newResource);
    return axios.post("api/resources", newResource);
  },

  // Put route to update Resources
  // Called when:
  // Resource is moved across the board
  // Resource is edited in the modal
  // Resource is deleted
  updateResource: function(resourceID, updatedResource) {
    console.log(updatedResource);
    return axios.put(`api/resources/${resourceID}`, updatedResource);
  }
};
