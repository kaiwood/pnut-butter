'use strict';

/**
 * Streams
 */
module.exports = (api) => {
  return {
    /**
     * The global timeline
     * @returns {Promise}
     */
    global() {
      return api.call(`/posts/streams/global`);
    },
  }
}