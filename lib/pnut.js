require('es6-promise').polyfill();
require('isomorphic-fetch');

const public = require('./public');

/**
 * pnut-butter.js
 *
 * Wrapper library for the pnut.io API.
 *
 * @returns {Object}
 */
const pnut = () => {

  const shared = {
    base: 'https://api.pnut.io/v0',
    token: '',

    call(uri, { httpMethod = 'GET', resultAs = 'json', data = {} } = {}) {
      let auth = {};
      if (this.token !== '') {
        auth = {
          "Authorization": `Bearer ${this.token}`
        }
      }

      let options = {
        method: httpMethod,
        headers: auth
      }

      if (httpMethod !== 'GET' && Object.keys(data).length > 0) {
        options.body = JSON.stringify(data)
        options.headers['Content-Type'] = 'application/json'
      }

      return fetch(uri, options).then(function (response) {
        if (resultAs === 'response') {
          return response;
        } else {
          return response[resultAs]();
        }
      });
    }
  }

  return Object.assign(
    {
      /**
       * Set auth token
       * @param {string} newToken - API access token
       */
      set token(newToken) {
        shared.token = newToken;
      },

      /**
       * Send request with custom endpoint / parameters
       * @param {string} endpoint - The custom call
       * @param {string} method - HTTP verb, defaults to GET
       * @return {Promise}
       */
      custom(endpoint, method = 'GET', data = {}) {
        endpoint = endpoint.startsWith('/') ? `${endpoint}` : `/${endpoint}`
        return shared.call(`${shared.base}${endpoint}`, { httpMethod: method, data: data })
      },

      /**
      * Generate a URL for client side authentication
      * @param {string} - Client ID token
      * @param {string} redirectURI - URI you want to be redirected at
      * @param {object} [scope] - The scope you want to request
      * @returns {string}
      */
      authenticateClientURL(clientId = '', redirectURI = '', scope = {
        basic: true,
        stream: true,
        write_post: true,
        follow: true,
        update_profile: true,
        presence: true,
        messages: true,
        public_messages: true,

      }) {

        if (clientId.length < 1) {
          throw new Error('You need a client ID for this request');
        } else if (redirectURI.length < 1) {
          throw new Error('You need a redirect URI for this request');
        }

        let url = `https://pnut.io/oauth/authenticate?`;
        url += `client_id=${clientId}`;
        url += `&redirect_uri=${redirectURI}`
        url += `&scope=${Object.keys(scope).join(',')}`
        url += `&response_type=token`

        return url
      }

    },

    public(shared)
  )
}


module.exports = pnut();