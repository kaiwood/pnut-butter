'use strict';

module.exports = (api) => {
  return {
    /**
     * Retrieve a channel object.
     * @param {string|number} channelId - A channel id
     * @returns {Promise}
     */
    channel(channelId) {
      return api.request(`/channels/${channelId}`);
    },

    /**
     * Retrieve a list of specified channel objects.
     *
     * @param {...string|number} channelIds - channel ids, max 200
     * @returns {Promise}
     */
    channels(...channelIds) {
      return api.request(`/channels?ids=${channelIds.join(',')}`);
    },

    /**
     * Retrieve a list of channels created by the authenticated user.
     * @returns {Promise}
     */
    usersChannels() {
      return api.request(`/users/me/channels`);
    },

    /**
     * Retrieve a Private Message channel for a set of users, if one exists.
     * @param {...string|number} userIds - user ids
     * @returns {Promise}
     */
    pmChannelFor(...userIds) {
      return api.request(`/users/me/channels/existing_pm?ids=${userIds.join(',')}`);
    },

    /**
     * Retrieve the number of unread private messages for the authenticated user.
     * @returns {Promise}
     */
    unread() {
      return api.request('/users/me/channels/num_unread/pm');
    },

    /**
     * Mark all unread private messages as read for the authenticated user.
     * @returns {Promise}
     */
    markAllAsRead() {
      return api.request('/users/me/channels/num_unread/pm', {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Deactivate a channel.
     * @param {string|Number} channelId - Id of a channel
     */
    deactivateChannel(channelId) {
      return api.request(`/channels/${channelId}`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve a list of channels the authenticated user is subscribed to.
     */
    subscribed() {
      return api.request('/users/me/channels/subscribed')
    },

    /**
     * Retrieve a list of users subscribed to a channel.
     * @param {string|Number} channelId - Id of a channel
     */
    subscribers(channelId) {
      return api.request(`/channels/${channelId}/subscribers`);
    },

    /**
     * Subscribe to updates from a channel.
     * @param {string|Number} channelId - Id of a channel
     */
    subscribe(channelId) {
      return api.request(`/channels/${channelId}/subscribe`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Delete a subscription for a channel.
     * @param {string|Number} channelId - Id of a channel
     */
    unsubscribe(channelId) {
      return api.request(`/channels/${channelId}/subscribe`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve a list of channels the authenticated user has muted.
     */
    mutedChannels() {
      return api.request('/users/me/channels/muted');
    },

    /**
     * Mute subscriptions for a channel. Muting unsubscribes, if you were subscribed.
     * @param {string|Number} channelId - Id of a channel
     */
    muteChannel(channelId) {
      return api.request(`/channels/${channelId}/mute`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Delete a subscription mute for a channel.
     * @param {string|Number} channelId - Id of a channel
     */
    unmuteChannel(channelId) {
      return api.request(`/channels/${channelId}/mute`, {
        httpMethod: 'DELETE'
      });
    }
  };
};
