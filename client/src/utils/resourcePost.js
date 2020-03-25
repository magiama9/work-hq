import axios from "axios";

export default {
  // Post route to add Resources
  addResource: function(newResource) {
    return axios.post("api/resources", newResource);
  },
  addResume: function(newResource) {
    return axios.post("api/resources/resume", newResource);
  },
  addCL: function(newResource) {
    return axios.post("api/resources/cl", newResource);
  },

  // Put route to update Resources
  // Called when:
  // Resource is moved across the board
  // Resource is edited in the modal
  // Resource is deleted
  updateResource: function(resourceID, updatedResource) {
    return axios.put(`api/resources/${resourceID}`, updatedResource);
  }
};
