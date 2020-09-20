"use strict";

/**
 * Channels
 * @module channels
 */
export default (api) => {
  return {
    /**
     * Retrieve a channel object.
     * @param {string|number} channelId - A channel id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    channel(channelId, params = {}) {
      return api.request(`/channels/${channelId}`, { params: params });
    },

    /**
     * Retrieve a list of specified channel objects.
     *
     * @param {...string|number} channelIds - channel ids, max 200
     * @returns {Promise}
     */
    channels(...channelIds) {
      return api.request(`/channels`, { params: { ids: channelIds } });
    },

    /**
     * Retrieve a list of channels created by the authenticated user.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    usersChannels(params = {}) {
      return api.request(`/users/me/channels`, { params: params });
    },

    /**
     * Retrieve a Private Message channel for a set of users, if one exists.
     * @param {...string|number} userIds - user ids
     * @returns {Promise}
     */
    pmChannelFor(...userIds) {
      return api.request(`/users/me/channels/existing_pm`, {
        params: { ids: userIds },
      });
    },

    /**
     * Retrieve the number of unread private messages for the authenticated user.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    unread(params = {}) {
      return api.request("/users/me/channels/num_unread/pm", {
        params: params,
      });
    },

    /**
     * Mark all unread private messages as read for the authenticated user.
     * @returns {Promise}
     */
    markAllAsRead() {
      return api.request("/users/me/channels/num_unread/pm", {
        httpMethod: "DELETE",
      });
    },

    /**
     * Deactivate a channel.
     * @param {string|Number} channelId - Id of a channel
     * @returns {Promise}
     */
    deactivateChannel(channelId) {
      return api.request(`/channels/${channelId}`, {
        httpMethod: "DELETE",
      });
    },

    /**
     * Retrieve a list of channels the authenticated user is subscribed to.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    subscribed(params = {}) {
      return api.request("/users/me/channels/subscribed", { params: params });
    },

    /**
     * Retrieve a list of users subscribed to a channel.
     * @param {Object} [params] - Additional URI parameters
     * @param {string|Number} channelId - Id of a channel
     * @returns {Promise}
     */
    subscribers(channelId, params = {}) {
      return api.request(`/channels/${channelId}/subscribers`, {
        params: params,
      });
    },

    /**
     * Subscribe to updates from a channel.
     * @param {string|Number} channelId - Id of a channel
     * @returns {Promise}
     */
    subscribe(channelId) {
      return api.request(`/channels/${channelId}/subscribe`, {
        httpMethod: "PUT",
      });
    },

    /**
     * Delete a subscription for a channel.
     * @param {string|Number} channelId - Id of a channel
     * @returns {Promise}
     */
    unsubscribe(channelId) {
      return api.request(`/channels/${channelId}/subscribe`, {
        httpMethod: "DELETE",
      });
    },

    /**
     * Retrieve a list of channels the authenticated user has muted.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    mutedChannels(params = {}) {
      return api.request("/users/me/channels/muted", { params: params });
    },

    /**
     * Mute subscriptions for a channel. Muting unsubscribes, if you were subscribed.
     * @param {string|Number} channelId - Id of a channel
     * @returns {Promise}
     */
    muteChannel(channelId) {
      return api.request(`/channels/${channelId}/mute`, {
        httpMethod: "PUT",
      });
    },

    /**
     * Delete a subscription mute for a channel.
     * @param {string|Number} channelId - Id of a channel
     * @returns {Promise}
     */
    unmuteChannel(channelId) {
      return api.request(`/channels/${channelId}/mute`, {
        httpMethod: "DELETE",
      });
    },

    /**
     * Retrieve a list of channels filtered by the given criteria.
     *
     * @example
     * pnut.searchChannels({
     *   isPublic: 1,
     *   channelTypes: "io.pnut.core.chat",
     *   categories: "fun"
     * });
     * @param {Object} params - Search parameters
     * @returns {Promise}
     */
    searchChannels(params = {}) {
      return api.request("/channels/search", { params: params });
    },
  };
};
