if (typeof fetch === 'undefined') {
  const fetch = require('node-fetch');
}

/**
 * pnut-butter.js
 *
 * Wrapper library for the pnut.io API.
 *
 * @returns {Object}
 */
const pnut = () => {
  const _base = 'https://api.pnut.io/v0'

  let _token = '';

  const call = (uri, {httpMethod = 'GET', resultAs = 'json'} = {}) => {

    let auth = {};
    if (_token !== '') {
      auth = {
        "Authorization": `Bearer ${_token}`
      }
    }

    return fetch(uri, {
      method: httpMethod,
      headers: auth
    }).then(function (response) {
      if (resultAs === 'response') {
        return response;
      } else {
        return response[resultAs]();
      }
    });
  }

  return {
    /**
     * Set auth token
     * @param {string} newToken - API access token
     */
    set token(newToken) {
      _token = newToken;
    },

    /**
     * Send request with custom endpoint / parameters
     * @param {string} endpoint - The custom call
     * @param {string} method - HTTP verb, defaults to GET
     * @return {Promise}
     */
     custom(endpoint, method = 'GET') {
      endpoint = endpoint.startsWith('/') ? `${endpoint}` : `/${endpoint}`
      return call(`${_base}${endpoint}`, {httpMethod: method})
     },

    /**
     * The global timeline
     * @returns {Promise}
     */
    global() {
      return call(`${_base}/posts/streams/global`);
    },

    /**
     * Retrieve a user object.
     * @param {string} userId - The user id
     * @returns {Promise}
     */
    user(userId) {
      return call(`${_base}/users/${userId}`);
    },

    /**
     * Retrieve a users avatar image.
     * @param {string} userId - The user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     */
    avatar(userId, buffered = true) {
      options = buffered ? {resultAs: 'buffer'} : {resultAs: 'response'}
      return call(`${_base}/users/${userId}/avatar`, options);
    },

    /**
     * Retrieve a users cover image.
     * @param {string} userId - The user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     */
    cover(userId, buffered = true) {
      options = buffered ? {resultAs: 'buffer'} : {resultAs: 'response'}
      return call(`${_base}/users/${userId}/cover`, options);
    },

    /**
     * Retrieve a list of specified user objects. Only retrieves the first 200 found
     * @param {array} userIds - An array of user ids
     * @returns {Promise}
     */
    users(userIds) {
      return call(`${_base}/users?ids=${userIds.join(',')}`);
    },

    /**
     * Retrieve a post object.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    post(postId) {
      return call(`${_base}/posts/${postId}`);
    },

    /**
     * Retrieve a list of specified post objects. Only retrieves the first 200 found
     * @param {array} ids - An array of post ids
     * @returns {Promise}
     */
    posts(ids) {
      return call(`${_base}/posts?ids=${ids.join(',')}`);
    },

    /**
     * Retrieve a list of previous versions of a post, not including the most recent.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    revisions(postId) {
      return call(`${_base}/posts/${postId}/revisions`);
    },

    /**
     * Retrieve posts mentioning the specified user.
     * @param {string} userid - The user id
     * @returns {Promise}
     */
    mentions(userId) {
      return call(`${_base}/users/${userId}/mentions`);
    },

    /**
     * Retrieve posts created by a specific user
     * @param {string} userId - The user id
     * @returns {Promise}
     */
    postsFrom(userId) {
      return call(`${_base}/users/${userId}/posts`);
    },

    /**
     * Retrieve a stream of all posts that include the specified tag.
     * @param {string} tag – The tag name
     * @returns {Promise}
     */
    postsTaggedWith(tag) {
      return call(`${_base}/posts/tag/${encodeURI(tag)}`);
    },

    /**
     * Retrieve posts within a thread.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    thread(postId) {
      return call(`${_base}/posts/${postId}/thread`);
    },

    /**
     * Retrieve actions executed against a post.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    actions(postId) {
      return call(`${_base}/posts/${postId}/actions`);
    }
  }
}


module.exports = pnut();