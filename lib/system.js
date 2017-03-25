'use strict';

/**
 * System
 */
module.exports = (api) => {
  return {
    /**
     * Retrieve a list of parameters for interacting with the API.
     * @returns {Promise}
     */
    config() {
      return api.request('/sys/config');
    },

    /**
     * Retrieve basic statistics for the network.
     * @returns {Promise}
     */
    stats() {
      return api.request('/sys/stats');
    }
  };
};