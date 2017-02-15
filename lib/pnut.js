const fetch = require('node-fetch');

/**
 * pnut-butter.js
 *
 * Wrapper library for the pnut.io API.
 *
 * @returns {Object}
 */
const pnut = () => {
  const _base = 'https://api.pnut.io/v0'

  const call = (uri, {httpMethod = 'GET', resultAs = 'json'} = {}) => {
    return fetch(uri, {
      method: httpMethod
    }).then(function (response) {
      if (resultAs == 'response') {
        return response;
      } else {
        return response[resultAs]();
      }
    });
  }

  return {
    get base() {
      return _base
    },

    set base(root) {
      _base = root;
    },

    /**
     * The global timeline
     * @returns {<Promise>}
     */
    global() {
      return call(`${_base}/posts/streams/global`);
    },

    /**
     * Retrieve a user object.
     * @param {string} id - The user id
     * @returns {<Promise>}
     */
    user(id) {
      return call(`${_base}/users/${id}`);
    },

    /**
     * Retrieve a users avatar image.
     * @param {string} - The user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     */
    avatar(id, buffered = true) {
      options = buffered ? {resultAs: 'buffer'} : {resultAs: 'response'}
      return call(`${_base}/users/${id}/avatar`, options);
    },

    /**
     * Retrieve a users cover image.
     * @param {string} - The user id
     * @param {boolean} [true] - Should the return value be prebuffered via the fetch API?
     */
    cover(id, buffered = true) {
      options = buffered ? {resultAs: 'buffer'} : {resultAs: 'response'}
      return call(`${_base}/users/${id}/cover`, options);
    },

    /**
     * Retrieve a list of specified user objects. Only retrieves the first 200 found
     * @param {array} ids - An array of user ids
     * @returns {<Promise>}
     */
    users(ids) {
      return call(`${_base}/users?ids=${ids.join(',')}`);
    },

    /**
     * Retrieve a post object.
     * @param {string} id - The post id
     * @returns {<Promise>}
     */
    post(id) {
      return call(`${_base}/posts/${id}`);
    },

    /**
     * Retrieve a list of specified post objects. Only retrieves the first 200 found
     * @param {array} ids - An array of post ids
     * @returns {<Promise>}
     */
    posts(ids) {
      return call(`${_base}/posts?ids=${ids.join(',')}`);
    },

    /**
     * Retrieve a list of previous versions of a post, not including the most recent.
     * @param {string} id - The post id
     * @returns {<Promise>}
     */
    revisions(id) {
      return call(`${_base}/posts/1/revisions`);
    },

    /**
     * Retrieve posts mentioning the specified user.
     * @param {string} id - The user id
     * @returns {<Promise>}
     */
    mentions(id) {
      return call(`${_base}/users/${id}/mentions`);
    }
  }
}


module.exports = pnut();