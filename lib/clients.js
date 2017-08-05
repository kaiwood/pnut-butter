"use strict";

/**
 * Clients
 * @module clients
 */
module.exports = api => {
  return {
    /**
     * Retrieve details on a public client.
     *
     * @example
     * pnut.client("3PFPMSet53RutGINA8e5HWqYg_UCDHad").then(res => {
     *  console.log(res);
     * });
     * @param {string} clientId - A client id
     * @returns {Promise}
     */
    client(clientId) {
      return api.request(`/clients/${clientId}`);
    },

    /**
     * Retrieve a list of active clients created by a user.
     *
     * @example
     * pnut.clientsByUser("@33MHz").then(res => {
     *  console.log(res);
     * });
     * @param {string|number} userId - A user id
     * @returns {Promise}
     */
    clientsByUser(userId) {
      return api.request(`/users/${userId}/clients`);
    }
  };
};
