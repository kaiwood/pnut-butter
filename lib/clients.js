"use strict";

/**
 * {@link https://pnut.io/docs/api/resources/clients}
 * @module clients
 */
module.exports = api => {
  return {
    /**
     * Retrieve details on a public client.
     * @see https://pnut.io/docs/api/resources/clients#get-users-id-clients
     * @example
     * const { meta, data = await pnut.client("3PFPMSet53RutGINA8e5HWqYg_UCDHad");
     * @param {string} clientId - A client id
     * @returns {Promise}
     */
    client(clientId) {
      return api.request(`/clients/${clientId}`);
    },

    /**
     * Retrieve a list of active clients created by a user.
     * @see https://pnut.io/docs/api/resources/clients#get-clients-id
     * @example
     * const { meta, data } = await pnut.clientsByUser("@33MHz");
     * @param {string|number} userId - A user id
     * @returns {Promise}
     */
    clientsByUser(userId) {
      return api.request(`/users/${userId}/clients`);
    }
  };
};
