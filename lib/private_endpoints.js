'use strict';

module.exports = (api) => {
  return {
    /**
     * Replaces the authenticated user's profile. Anything not included is removed.
     *
     * @param {object} profile - Object with the required API parameters
     */
    replaceProfile(profile = {}) {
      return api.call('/users/me', {
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
      return api.call('/users/me', {
        httpMethod: 'PATCH',
        data: profile
      })
    },

    /**
     * Retrieve a list of user objects that the specified user is following.
     *
     * @param {string} userId - a user id
     */
    following(userId) {
      return api.call(`/users/${userId}/following`);
    },

    /**
     * Retrieve a list of user objects that are following the specified user.
     *
     * @param {string} userId - a user id
     */
    followers(userId) {
      return api.call(`/users/${userId}/followers`)
    },

    /**
     * Follow a user.
     *
     * @param {string} userId - id of user to follow
     */
    follow(userId) {
      return api.call(`/users/${userId}/follow`, { httpMethod: 'PUT' })
    },

    /**
     * Unfollow a user.
     *
     * @param {string} userId - id of the user to unfollow
     */
    unfollow(userId) {
      return api.call(`/users/${userId}/follow`, { httpMethod: 'DELETE' });
    },

    /**
     * Retrieve a list of muted users.
     */
    muted() {
      return api.call(`/users/me/muted`);
    },

    /**
     * Mute a user.
     *
     * @param {string} userId - id of the user to mute
     */
    mute(userId) {
      return api.call(`/users/${userId}/mute`, { httpMethod: 'PUT' });
    },

    /**
     * Unmute a user.
     *
     * @param {string} userId - id of the user to unmute
     */
    unmute(userId) {
      return api.call(`/users/${userId}/mute`, { httpMethod: 'DELETE' });
    },

    /**
     * Retrieve a list of blocked users.
     */
    blocked() {
      return api.call(`/users/me/blocked`, { httpMethod: 'GET' });
    },

    /**
     * Block a user.
     *
     * @param {string} userId - id of the user to block
     */
    block(userId) {
      return api.call(`/users/${userId}/block`, { httpMethod: 'PUT' });
    },

    /**
     * Unblock a user.
     *
     * @param {string} userId - id of the user to unblock
     */
    unblock(userId) {
      return api.call(`/users/${userId}/block`, { httpMethod: 'DELETE' });
    },

    /**
     * Retrieve all users' presence statuses that are not "offline"
     */
    presence() {
      return api.call('/presence');
    },

    /**
     * Retrieve a user's presence.
     *
     * @param {string} userId - A user id
     */
    presenceOf(userId) {
      return api.call(`/presence/${userId}`);
    },

    /**
     * Update a user's presence.
     *
     * @param {msg} msg - An optional status message
     */
    updatePresence(msg) {
      let params = { httpMethod: 'PUT' };
      if (msg) {
        params.data = { presence: msg }
      }

      return api.call('/users/me/presence', params);
    }
  }
}