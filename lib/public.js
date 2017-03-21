'use strict';

module.exports = (shared) => {
  return {
    /**
     * The global timeline
     * @returns {Promise}
     */
    global() {
      return shared.call(`${shared.base}/posts/streams/global`);
    },

    /**
     * Retrieve a user object.
     * @param {string} userId - The user id
     * @returns {Promise}
     */
    user(userId) {
      return shared.call(`${shared.base}/users/${userId}`);
    },

    /**
     * Retrieve a users avatar image.
     * @param {string} userId - The user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     */
    avatar(userId, buffered = true) {
      let options = buffered ? { resultAs: 'buffer' } : { resultAs: 'response' }
      return shared.call(`${shared.base}/users/${userId}/avatar`, options);
    },

    /**
     * Retrieve a users cover image.
     * @param {string} userId - The user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     */
    cover(userId, buffered = true) {
      let options = buffered ? { resultAs: 'buffer' } : { resultAs: 'response' }
      return shared.call(`${shared.base}/users/${userId}/cover`, options);
    },

    /**
     * Retrieve a list of specified user objects. Only retrieves the first 200 found
     * @param {array} userIds - An array of user ids
     * @returns {Promise}
     */
    users(userIds) {
      return shared.call(`${shared.base}/users?ids=${userIds.join(',')}`);
    },

    /**
     * Retrieve a post object.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    post(postId) {
      return shared.call(`${shared.base}/posts/${postId}`);
    },

    /**
     * Retrieve a list of specified post objects. Only retrieves the first 200 found
     * @param {array} ids - An array of post ids
     * @returns {Promise}
     */
    posts(ids) {
      return shared.call(`${shared.base}/posts?ids=${ids.join(',')}`);
    },

    /**
     * Retrieve a list of previous versions of a post, not including the most recent.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    revisions(postId) {
      return shared.call(`${shared.base}/posts/${postId}/revisions`);
    },

    /**
     * Retrieve posts mentioning the specified user.
     * @param {string} userid - The user id
     * @returns {Promise}
     */
    mentions(userId) {
      return shared.call(`${shared.base}/users/${userId}/mentions`);
    },

    /**
     * Retrieve posts created by a specific user
     * @param {string} userId - The user id
     * @returns {Promise}
     */
    postsFrom(userId) {
      return shared.call(`${shared.base}/users/${userId}/posts`);
    },

    /**
     * Retrieve a stream of all posts that include the specified tag.
     * @param {string} tag – The tag name
     * @returns {Promise}
     */
    postsTaggedWith(tag) {
      return shared.call(`${shared.base}/posts/tag/${encodeURI(tag)}`);
    },

    /**
     * Retrieve posts within a thread.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    thread(postId) {
      return shared.call(`${shared.base}/posts/${postId}/thread`);
    },

    /**
     * Retrieve actions executed against a post.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    actions(postId) {
      return shared.call(`${shared.base}/posts/${postId}/actions`);
    }
  }
}
