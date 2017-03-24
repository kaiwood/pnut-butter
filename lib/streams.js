'use strict';

/**
 * Streams
 */
module.exports = (api) => {
  return {
    /**
     * The global timeline.
     * @returns {Promise}
     */
    global() {
      return api.request(`/posts/streams/global`);
    },

    /**
     * The authenticated user's stream of posts from their followers and themself.
     * @returns {Promise}
     */
    personal() {
      return api.request('/posts/streams/me');
    },


    /**
     * A combined Personal Stream including the authenticated user's mentions.
     * @returns {Promise}
     */
    unified() {
      return api.request('/posts/streams/unified');
    }
  };
};