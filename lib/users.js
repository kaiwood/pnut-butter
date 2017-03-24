'use strict';

/**
 * User related endpoints
 */
module.exports = (api) => {
  return {
    /**
     * Retrieve a user object.
     * @param {string} userId - The user id
     * @returns {Promise}
     */
    user(userId) {
      return api.request(`/users/${userId}`);
    },

    /**
     * Retrieve a users avatar image.
     * @param {string} userId - The user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     */
    avatar(userId, buffered = true) {
      let options = buffered ? { resultAs: 'buffer' } : { resultAs: 'response' };
      return api.request(`/users/${userId}/avatar`, options);
    },

    /**
     * Retrieve a users cover image.
     * @param {string} userId - The user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     */
    cover(userId, buffered = true) {
      let options = buffered ? { resultAs: 'buffer' } : { resultAs: 'response' };
      return api.request(`/users/${userId}/cover`, options);
    },

    /**
     * Retrieve a list of specified user objects. Only retrieves the first 200 found
     * @param {array} userIds - An array of user ids
     * @returns {Promise}
     */
    users(...userIds) {
      return api.request(`/users?ids=${userIds.join(',')}`);
    },

    /**
     * Retrieve posts mentioning the specified user.
     * @param {string} userid - The user id
     * @returns {Promise}
     */
    mentions(userId) {
      return api.request(`/users/${userId}/mentions`);
    },

    /**
     * Retrieve posts created by a specific user
     * @param {string} userId - The user id
     * @returns {Promise}
     */
    postsFrom(userId) {
      return api.request(`/users/${userId}/posts`);
    },

    /**
     * Replaces the authenticated user's profile. Anything not included is removed.
     *
     * @param {object} profile - Object with the required API parameters
     */
    replaceProfile(profile = {}) {
      return api.request('/users/me', {
        httpMethod: 'PUT',
        data: profile
      });
    },

    /**
     * Updates only specified parts of the authenticated user's profile
     *
     * @param {object} profile - Object with the require API parameters
     */
    updateProfile(profile = {}) {
      return api.request('/users/me', {
        httpMethod: 'PATCH',
        data: profile
      });
    },

    /**
     * Retrieve a list of user objects that the specified user is following.
     *
     * @param {string} userId - a user id
     */
    following(userId) {
      return api.request(`/users/${userId}/following`);
    },

    /**
     * Retrieve a list of user objects that are following the specified user.
     *
     * @param {string} userId - a user id
     */
    followers(userId) {
      return api.request(`/users/${userId}/followers`);
    },

    /**
     * Follow a user.
     *
     * @param {string} userId - id of user to follow
     */
    follow(userId) {
      return api.request(`/users/${userId}/follow`, { httpMethod: 'PUT' });
    },

    /**
     * Unfollow a user.
     *
     * @param {string} userId - id of the user to unfollow
     */
    unfollow(userId) {
      return api.request(`/users/${userId}/follow`, { httpMethod: 'DELETE' });
    },

    /**
     * Retrieve a list of muted users.
     */
    muted() {
      return api.request(`/users/me/muted`);
    },

    /**
     * Mute a user.
     *
     * @param {string} userId - id of the user to mute
     */
    mute(userId) {
      return api.request(`/users/${userId}/mute`, { httpMethod: 'PUT' });
    },

    /**
     * Unmute a user.
     *
     * @param {string} userId - id of the user to unmute
     */
    unmute(userId) {
      return api.request(`/users/${userId}/mute`, { httpMethod: 'DELETE' });
    },

    /**
     * Retrieve a list of blocked users.
     */
    blocked() {
      return api.request(`/users/me/blocked`, { httpMethod: 'GET' });
    },

    /**
     * Block a user.
     *
     * @param {string} userId - id of the user to block
     */
    block(userId) {
      return api.request(`/users/${userId}/block`, { httpMethod: 'PUT' });
    },

    /**
     * Unblock a user.
     *
     * @param {string} userId - id of the user to unblock
     */
    unblock(userId) {
      return api.request(`/users/${userId}/block`, { httpMethod: 'DELETE' });
    },

    /**
     * Retrieve all users' presence statuses that are not "offline"
     */
    presence() {
      return api.request('/presence');
    },

    /**
     * Retrieve a user's presence.
     *
     * @param {string} userId - A user id
     */
    presenceOf(userId) {
      return api.request(`/presence/${userId}`);
    },

    /**
     * Update a user's presence.
     *
     * @param {msg} msg - An optional status message
     */
    updatePresence(msg) {
      let params = { httpMethod: 'PUT' };
      if (msg) {
        params.data = { presence: msg };
      }

      return api.request('/users/me/presence', params);
    }
  };
};