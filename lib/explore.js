"use strict";

/**
 * Explore
 * @module explore
 */
module.exports = api => {
  return {
    /**
     * New conversations just starting on pnut.io
     * @param {Object} [params] - Additional URI parameters
     */
    conversations(params = {}) {
      return api.request("/posts/streams/explore/conversations", {
        params: params
      });
    },

    /**
     * Posts with photos on pnut.io
     * @param {Object} [params] - Additional URI parameters
     */
    photos(params) {
      return api.request("/posts/streams/explore/photos", {
        params: params
      });
    },

    /**
     * Posts trending on pnut.io
     * @param {Object} [params] - Additional URI parameters
     */
    trending(params) {
      return api.request("/posts/streams/explore/trending", {
        params: params
      });
    },

    /**
     * Posts with missed conversations
     * @param {Object} [params] - Additional URI parameters
     */
    missedConversations(params) {
      return api.request("/posts/streams/explore/missed_conversations", {
        params: params
      });
    }
  };
};
