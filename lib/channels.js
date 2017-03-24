'use strict';

module.exports = (api) => {
  return {
    /**
     * Retrieve a channel object.
     *
     * @param {string|number} channelId - id of a channel
     */
    channel(channelId) {
      return api.request(`/channels/${channelId}`);
    },

    /**
     * Retrieve a list of specified channel objects.
     *
     * @param {...string|number} channelIds - channel ids, max 200
     */
    channels(...channelIds) {
      return api.request(`/channels?ids=${channelIds.join(',')}`);
    },

    /**
     * Retrieve a list of channels created by the authenticated user.
     */
    usersChannels() {
      return api.request(`/users/me/channels`);
    },

    /**
     * Retrieve a Private Message channel for a set of users, if one exists.
     *
     * @param {...string|number} userIds - list of userIds
     */
    pmChannelFor(...userIds) {
      return api.request(`/users/me/channels/existing_pm?ids=${userIds.join(',')}`);
    },

    /**
     * Retrieve the number of unread private messages for the authenticated user.
     */
    unread() {
      return api.request('/users/me/channels/num_unread/pm');
    },

    /**
     * Mark all unread private messages as read for the authenticated user.
     */
    markAsRead() {
      return api.request('/users/me/channels/num_unread/pm', {
        httpMethod: 'DELETE'
      });
    }
  };
};