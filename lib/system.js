"use strict";

/**
 * System
 * @module system
 */
module.exports = api => {
  return {
    /**
     * Retrieve a list of parameters for interacting with the API.
     * 
     * @example
     * pnut.config();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    config(params = {}) {
      return api.request("/sys/config", { params: params });
    },

    /**
     * Retrieve basic statistics for the network.
     * 
     * @example
     * pnut.stats();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    stats(params = {}) {
      return api.request("/sys/stats", { params: params });
    }
  };
};
