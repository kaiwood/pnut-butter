'use strict';

module.exports = (api) => {
  return {
    /**
     * Retrieve a channel object.
     *
     * @param {string|number} channelId - id of a channel
     */
    channel(channelId) {
      return api.call(`/channels/${channelId}`);
    },

    /**
     * Retrieve a list of specified channel objects.
     *
     * @param {...string|number} channelIds - channel ids, max 200
     */
    channels(...channelIds) {
      return api.call(`/channels?ids=${channelIds.join(',')}`);
    },

    /**
     * Retrieve a list of channels created by the authenticated user.
     */
    usersChannels() {
      return api.call(`/users/me/channels`);
    },

    /**
     * Retrieve a Private Message channel for a set of users, if one exists.
     *
     * @param {...string|number} userIds - list of userIds
     */
    pmChannelFor(...userIds) {
      return api.call(`/users/me/channels/existing_pm?ids=${userIds.join(',')}`);
    },

    /**
     * Retrieve the number of unread private messages for the authenticated user.
     */
    unread() {
      return api.call('/users/me/channels/num_unread/pm');
    },

    markAsRead() {
      return api.call('/users/me/channels/num_unread/pm', {
        httpMethod: 'DELETE'
      });
    }
  };
};