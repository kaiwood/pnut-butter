'use strict';

/**
 * Messages
 */
module.exports = (api) => {
  return {
    /**
     * Retrieve a message from a channel.
     * @param {string|Number} channelId - Id of a channel
     * @param {string|Number} messageId - Id of a message
     */
    message(channelId, messageId) {
      return api.request(`/channels/${channelId}/messages/${messageId}`);
    },

    messageThread(channelId, messageId) {
      return api.request(`/channels/${channelId}/messages/${messageId}/thread`);
    },

    /**
     * Retrieve a list of specified messages.
     * @param {...string|Number} messageIds - Message ids, max 200
     */
    messages(...messageIds) {
      return api.request(`/channels/messages?ids=${messageIds.join(',')}`);
    },

    /**
     * Retrieve paginated messages from a channel.
     * @param {string|Number} channelId - Id of a channel
     */
    channelMessages(channelId) {
      // TODO: Needs before_id / since_id
      return api.request(`/channels/${channelId}/messages`);
    },

    /**
     * Retrieve a paginated list of messages created by the authenticated user.
     */
    personalMessages() {
      // TODO: Needs before_id / since_id
      return api.request('/users/me/messages');
    },

    /**
     * Create a message in a channel.
     * @param {string|Number} channelId - A channel id
     * @param {string} message - A message
     */
    createMessage(channelId, text) {
      return api.request(`/channels/${channelId}/messages`, {
        httpMethod: 'POST',
        data: {
          text: text
        }
      });
    },

    /**
     * Delete a message in a channel.
     * @param {string|Number} channelId - Id of a channel
     * @param {*} messageId - Id of the message to delete
     */
    deleteMessage(channelId, messageId) {
      return api.request(`/channels/${channelId}/messages/${messageId}`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve sticky messsages in a channel.
     * @param {string|Number} channelId - Id of a channel
     */
    stickies(channelId) {
      return api.request(`/channels/${channelId}/sticky_messages`);
    },

    /**
     * Sticky a message.
     * @param {string|Number} channelId - Id of a channel
     * @param {string|Number} messageId - Id of the message to sticky
     */
    sticky(channelId, messageId) {
      return api.request(`/channels/${channelId}/messages/${messageId}/sticky`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Unsticky a message.
     * @param {string|Number} channelId - Id of a channel
     * @param {*} messageId - Id of the message to unsticky
     */
    unsticky(channelId, messageId) {
      return api.request(`/channels/${channelId}/messages/${messageId}/sticky`, {
        httpMethod: 'DELETE'
      });
    },
  };
};