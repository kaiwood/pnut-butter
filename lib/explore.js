"use strict";

/**
 * {@link https://pnut.io/docs/api/resources/explore}
 * @module explore
 */
module.exports = api => {
  return {
    /**
     * New conversations just starting on pnut.io
     *
     * @example
     * const { meta, data } = await pnut.conversations();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    conversations(params = {}) {
      return api.request("/posts/streams/explore/conversations", {
        params: params
      });
    },

    /**
     * Posts with photos on pnut.io
     *
     * @example
     * const { meta, data } = await pnut.photos();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    photos(params) {
      return api.request("/posts/streams/explore/photos", {
        params: params
      });
    },

    /**
     * Posts trending on pnut.io
     *
     * @example
     * const { meta, data } = await pnut.trending();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    trending(params) {
      return api.request("/posts/streams/explore/trending", {
        params: params
      });
    },

    /**
     * Posts with missed conversations
     *
     * @example
     * const { meta, data } = await pnut.missedConversations();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    missedConversations(params) {
      return api.request("/posts/streams/explore/missed_conversations", {
        params: params
      });
    }
  };
};
