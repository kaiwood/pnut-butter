"use strict";

/**
 * Users
 * @module users
 */
module.exports = api => {
  return {
    /**
     * Retrieve a user object.
     * @param {string|Number} userId - A user id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    user(userId, params = {}) {
      return api.request(`/users/${userId}`, { params: params });
    },

    /**
     * Retrieve a users avatar image.
     * @param {string|Number} userId - A user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     * @returns {Promise}
     */
    avatar(userId, buffered = true) {
      let options = buffered
        ? {
            resultAs: "buffer"
          }
        : {
            resultAs: "response"
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
      let options = buffered
        ? {
            resultAs: "buffer"
          }
        : {
            resultAs: "response"
          };
      return api.request(`/users/${userId}/cover`, options);
    },

    /**
     * Retrieve a list of specified user objects. Only retrieves the first 200 found.
     * @param {...string|Number} userIds - 1 or more user ids
     * @returns {Promise}
     */
    users(...userIds) {
      return api.request(`/users`, { params: { ids: userIds } });
    },

    /**
     * Retrieve posts mentioning the specified user.
     * @param {string|Number} userid - A user id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    mentions(userId, params = {}) {
      return api.request(`/users/${userId}/mentions`, { params: params });
    },

    /**
     * Retrieve posts created by a specific user.
     * @param {string|Number} userId - A user id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    postsFrom(userId, params = {}) {
      return api.request(`/users/${userId}/posts`, { params: params });
    },

    /**
     * Replaces the authenticated user's profile. Anything not included is removed.
     * @param {Object} profile - Object with the required API parameters
     * @returns {Promise}
     */
    replaceProfile(profile = {}) {
      return api.request("/users/me", {
        httpMethod: "PUT",
        data: profile
      });
    },

    /**
     * Updates only specified parts of the authenticated user's profile.
     * @param {Object} profile - Object with the require API parameters
     * @returns {Promise}
     */
    updateProfile(profile = {}) {
      return api.request("/users/me", {
        httpMethod: "PATCH",
        data: profile
      });
    },

    /**
     * Retrieve a list of user objects that the specified user is following.
     * @param {string|Number} userId - A user id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    following(userId, params = {}) {
      return api.request(`/users/${userId}/following`, { params: params });
    },

    /**
     * Retrieve a list of user objects that are following the specified user.
     * @param {string|Number} userId - A user id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    followers(userId, params = {}) {
      return api.request(`/users/${userId}/followers`, { params: params });
    },

    /**
     * Follow a user.
     * @param {string|Number} userId - id of user to follow
     * @returns {Promise}
     */
    follow(userId) {
      return api.request(`/users/${userId}/follow`, {
        httpMethod: "PUT"
      });
    },

    /**
     * Unfollow a user.
     * @param {string|Number} userId - id of the user to unfollow
     * @returns {Promise}
     */
    unfollow(userId) {
      return api.request(`/users/${userId}/follow`, {
        httpMethod: "DELETE"
      });
    },

    /**
     * Retrieve a list of muted users.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    muted(params = {}) {
      return api.request(`/users/me/muted`, { params: params });
    },

    /**
     * Mute a user.
     * @param {string|Number} userId - id of the user to mute
     * @returns {Promise}
     */
    mute(userId) {
      return api.request(`/users/${userId}/mute`, {
        httpMethod: "PUT"
      });
    },

    /**
     * Unmute a user.
     * @param {string|Number} userId - id of the user to unmute
     * @returns {Promise}
     */
    unmute(userId) {
      return api.request(`/users/${userId}/mute`, {
        httpMethod: "DELETE"
      });
    },

    /**
     * Retrieve a list of blocked users.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    blocked(params = {}) {
      return api.request(
        `/users/me/blocked`,
        {
          httpMethod: "GET"
        },
        { params: params }
      );
    },

    /**
     * Block a user.
     * @param {string|Number} userId - id of the user to block.
     * @returns {Promise}
     */
    block(userId) {
      return api.request(`/users/${userId}/block`, {
        httpMethod: "PUT"
      });
    },

    /**
     * Unblock a user.
     * @param {string} userId - id of the user to unblock.
     * @returns {Promise}
     */
    unblock(userId) {
      return api.request(`/users/${userId}/block`, {
        httpMethod: "DELETE"
      });
    },

    /**
     * Retrieve all users' presence statuses that are not "offline".
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    presence(params = {}) {
      return api.request("/presence", { params: params });
    },

    /**
     * Retrieve a user's presence.
     * @param {string} userId - A user id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    presenceOf(userId, params = {}) {
      return api.request(`/presence/${userId}`, { params: params });
    },

    /**
     * Update a user's presence.
     * @param {string} msg - An optional status message
     * @returns {Promise}
     */
    updatePresence(msg) {
      let params = {
        httpMethod: "PUT"
      };
      if (msg) {
        params.data = {
          presence: msg
        };
      }

      return api.request("/users/me/presence", params);
    }
  };
};
