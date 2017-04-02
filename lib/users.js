'use strict';

/**
 * Users
 * @module users
 */
module.exports = (api) => {
  return {
    /**
     * Retrieve a user object.
     * @param {string|Number} userId - A user id
     * @returns {Promise}
     */
    user(userId) {
      return api.request(`/users/${userId}`);
    },

    /**
     * Retrieve a users avatar image.
     * @param {string|Number} userId - A user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     * @returns {Promise}
     */
    avatar(userId, buffered = true) {
      let options = buffered ? {
        resultAs: 'buffer'
      } : {
        resultAs: 'response'
      };
      return api.request(`/users/${userId}/avatar`, options);
    },

    /**
     * Retrieve a users cover image.
     * @param {string|Number} userId - A user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     * @returns {Promise}
     */
    cover(userId, buffered = true) {
      let options = buffered ? {
        resultAs: 'buffer'
      } : {
        resultAs: 'response'
      };
      return api.request(`/users/${userId}/cover`, options);
    },

    /**
     * Retrieve a list of specified user objects. Only retrieves the first 200 found.
     * @param {...string|Number} userIds - 1 or more user ids
     * @returns {Promise}
     */
    users(...userIds) {
      return api.request(`/users?ids=${userIds.join(',')}`);
    },

    /**
     * Retrieve posts mentioning the specified user.
     * @param {string|Number} userid - A user id
     * @returns {Promise}
     */
    mentions(userId) {
      return api.request(`/users/${userId}/mentions`);
    },

    /**
     * Retrieve posts created by a specific user.
     * @param {string|Number} userId - A user id
     * @returns {Promise}
     */
    postsFrom(userId) {
      return api.request(`/users/${userId}/posts`);
    },

    /**
     * Replaces the authenticated user's profile. Anything not included is removed.
     * @param {Object} profile - Object with the required API parameters
     * @returns {Promise}
     */
    replaceProfile(profile = {}) {
      return api.request('/users/me', {
        httpMethod: 'PUT',
        data: profile
      });
    },

    /**
     * Updates only specified parts of the authenticated user's profile.
     * @param {Object} profile - Object with the require API parameters
     * @returns {Promise}
     */
    updateProfile(profile = {}) {
      return api.request('/users/me', {
        httpMethod: 'PATCH',
        data: profile
      });
    },

    /**
     * Retrieve a list of user objects that the specified user is following.
     * @param {string|Number} userId - A user id
     * @returns {Promise}
     */
    following(userId) {
      return api.request(`/users/${userId}/following`);
    },

    /**
     * Retrieve a list of user objects that are following the specified user.
     *
     * @param {string|Number} userId - A user id
     * @returns {Promise}
     */
    followers(userId) {
      return api.request(`/users/${userId}/followers`);
    },

    /**
     * Follow a user.
     * @param {string|Number} userId - id of user to follow
     * @returns {Promise}
     */
    follow(userId) {
      return api.request(`/users/${userId}/follow`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Unfollow a user.
     *
     * @param {string|Number} userId - id of the user to unfollow
     * @returns {Promise}
     */
    unfollow(userId) {
      return api.request(`/users/${userId}/follow`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve a list of muted users.
     * @returns {Promise}
     */
    muted() {
      return api.request(`/users/me/muted`);
    },

    /**
     * Mute a user.
     * @param {string|Number} userId - id of the user to mute
     * @returns {Promise}
     */
    mute(userId) {
      return api.request(`/users/${userId}/mute`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Unmute a user.
     * @param {string|Number} userId - id of the user to unmute
     * @returns {Promise}
     */
    unmute(userId) {
      return api.request(`/users/${userId}/mute`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve a list of blocked users.
     * @returns {Promise}
     */
    blocked() {
      return api.request(`/users/me/blocked`, {
        httpMethod: 'GET'
      });
    },

    /**
     * Block a user.
     * @param {string|Number} userId - id of the user to block.
     * @returns {Promise}
     */
    block(userId) {
      return api.request(`/users/${userId}/block`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Unblock a user.
     * @param {string} userId - id of the user to unblock.
     * @returns {Promise}
     */
    unblock(userId) {
      return api.request(`/users/${userId}/block`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve all users' presence statuses that are not "offline".
     */
    presence() {
      return api.request('/presence');
    },

    /**
     * Retrieve a user's presence.
     * @param {string} userId - A user id
     * @returns {Promise}
     */
    presenceOf(userId) {
      return api.request(`/presence/${userId}`);
    },

    /**
     * Update a user's presence.
     * @param {string} msg - An optional status message
     * @returns {Promise}
     */
    updatePresence(msg) {
      let params = {
        httpMethod: 'PUT'
      };
      if (msg) {
        params.data = {
          presence: msg
        };
      }

      return api.request('/users/me/presence', params);
    }
  };
};
