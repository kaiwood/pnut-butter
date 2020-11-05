"use strict";

/**
 * {@link https://pnut.io/docs/api/resources/system}
 * @module system
 */
export default (api) => {
  return {
    /**
     * Retrieve a list of parameters for interacting with the API.
     * @see https://pnut.io/docs/api/resources/system#get-sys-config
     * @example
     * const { mesta, data } = await pnut.config();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    config(params = {}) {
      return api.request("/sys/config", { params: params });
    },

    /**
     * Retrieve basic statistics for the network.
     * @see https://pnut.io/docs/api/resources/system#get-sys-stats
     * @example
     * const { meta, data } = await pnut.stats();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    stats(params = {}) {
      return api.request("/sys/stats", { params: params });
    },
  };
};
