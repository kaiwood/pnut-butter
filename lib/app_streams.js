"use strict";

/**
 * App Streams
 * @module app_streams
 */
module.exports = api => {
  return {
    /**
     * Get a specific app stream by its key.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    streams(params = {}) {
      return api.request("/streams", { params: params });
    },

    /**
     * Get a specific app stream by its key.
     * @param {string} streamKey - A stream key
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    stream(streamKey, params = {}) {
      return api.request(`/streams/${streamKey}`, { params: params });
    },

    /**
     * Create an app stream for the authenticated app.
     *
     * The options object must at least include "objectType",
     * which is an array of up to 5(!) valid apps streams to subscribe to.
     *
     * Allowed values are: post, bookmark, follow, mute, block, message,
     * channel, channel_subscription, token and user
     *
     * You can optionally add "key: 'myfancykeyname'" to name your stream.
     * If you do not supply your own key, you get back a generated one from
     * the API which you need to keep track of.
     *
     * @param {Object} options - Option object.
     * @returns {Promise}
     */
    createStream(options) {
      let sanitizedOptions = {
        type: "long_poll",
        object_types: options.objectTypes
      };

      if (options.key) {
        sanitizedOptions.key = options.key;
      }

      return api.request("/streams", {
        httpMethod: "POST",
        data: sanitizedOptions
      });
    },

    /**
     * Update an app stream for the authorized app.
     *
     * Same rules as in createStream apply, but "key"
     * is no longer optional and must be supplied to identify
     * the stream you want to update.
     * @param {Object} options - Options object
     * @returns {Promise}
     */
    updateStream(options) {
      let sanitizedOptions = {
        object_types: options.objectTypes
      };

      if (options.key) {
        sanitizedOptions.key = options.key;
      }

      return api.request("/streams", {
        httpMethod: "PUT",
        data: sanitizedOptions
      });
    },

    /**
     * Delete all app streams for the authorized app.
     * @returns {Promise}
     */
    deleteStreams() {
      return api.request("/streams", { httpMethod: "DELETE" });
    },

    /**
     * Delete a specific app stream by its key.
     * @param {string} streamKey - A stream key
     * @returns {Promise}
     */
    deleteStream(streamKey) {
      return api.request(`/streams/${streamKey}`, { httpMethod: "DELETE" });
    }
  };
};
