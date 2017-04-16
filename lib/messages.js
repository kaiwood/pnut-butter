"use strict";

/**
 * Messages
 * @module messages
 */
module.exports = api => {
  return {
    /**
     * Retrieve a message from a channel.
     * @param {string|Number} channelId - Id of a channel
     * @param {string|Number} messageId - Id of a message
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    message(channelId, messageId, params = {}) {
      return api.request(`/channels/${channelId}/messages/${messageId}`, {
        params: params
      });
    },

    /**
     * Retrieve messages in the same thread of a channel.
     * @param {string|Number} channelId - Id of a channel
     * @param {string|Number} messageId - Id of a message
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    messageThread(channelId, messageId, params = {}) {
      return api.request(
        `/channels/${channelId}/messages/${messageId}/thread`,
        { params: params }
      );
    },

    /**
     * Retrieve a list of specified messages.
     * @param {...string|Number} messageIds - Message ids, max 200
     * @returns {Promise}
     */
    messages(...messageIds) {
      return api.request(`/channels/messages`, { params: { ids: messageIds } });
    },

    /**
     * Retrieve paginated messages from a channel.
     * @param {string|Number} channelId - Id of a channel
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    channelMessages(channelId, params = {}) {
      return api.request(`/channels/${channelId}/messages`, { params: params });
    },

    /**
     * Retrieve a paginated list of messages created by the authenticated user.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    personalMessages(params = {}) {
      return api.request("/users/me/messages", { params: params });
    },

    /**
     * Create a message in a channel.
     * @param {string|Number} channelId - A channel id
     * @param {string} message - A message
     * @returns {Promise}
     */
    createMessage(channelId, text) {
      return api.request(`/channels/${channelId}/messages`, {
        httpMethod: "POST",
        data: {
          text: text
        }
      });
    },

    /**
     * Send a private message.
     *
     * "destination" can be either a single user id or an array of multiple users
     * @param {string|Number|Array} destination - Destination of the PM
     * @param {string} text - Text of the PM
     * @returns {Promise}
     */
    sendMessage(destination, text) {
      let dests = Array.isArray(destination) ? destination : [destination];

      return api.request(`/channels/pm/messages`, {
        httpMethod: "POST",
        data: {
          destinations: dests,
          text: text
        }
      });
    },

    /**
     * Delete a message in a channel.
     * @param {string|Number} channelId - Id of a channel
     * @param {*} messageId - Id of the message to delete
     * @returns {Promise}
     */
    deleteMessage(channelId, messageId) {
      return api.request(`/channels/${channelId}/messages/${messageId}`, {
        httpMethod: "DELETE"
      });
    },

    /**
     * Retrieve sticky messsages in a channel.
     * @param {string|Number} channelId - Id of a channel
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    stickies(channelId, params = {}) {
      return api.request(`/channels/${channelId}/sticky_messages`, {
        params: params
      });
    },

    /**
     * Sticky a message.
     * @param {string|Number} channelId - Id of a channel
     * @param {string|Number} messageId - Id of the message to sticky
     * @returns {Promise}
     */
    sticky(channelId, messageId) {
      return api.request(
        `/channels/${channelId}/messages/${messageId}/sticky`,
        {
          httpMethod: "PUT"
        }
      );
    },

    /**
     * Unsticky a message.
     * @param {string|Number} channelId - Id of a channel
     * @param {string|Number} messageId - Id of the message to unsticky
     * @returns {Promise}
     */
    unsticky(channelId, messageId) {
      return api.request(
        `/channels/${channelId}/messages/${messageId}/sticky`,
        {
          httpMethod: "DELETE"
        }
      );
    }
  };
};
