const fetch = require('node-fetch');

/**
 * pnut-butter.js
 */
const pnut = () => {
  const base = 'https://api.pnut.io/v0'

  const call = (uri) => {
    return fetch(uri, {
      method: 'GET'
    }).then(function (res) {
      return res.json();
    });
  }

  return {
    /**
     * The global timeline
     * @returns {<Promise>}
     */
    global() {
      return call(`${base}/posts/streams/global`);
    },

    /**
     * User lookup
     * @param {string} id – The user id
     * @returns {<Promise>}
     */
    user(id) {
      return call(`${base}`/users/{id});
    }
  }

}

module.exports = pnut();