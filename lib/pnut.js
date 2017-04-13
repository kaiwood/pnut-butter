require('es6-promise').polyfill();
require('isomorphic-fetch');

const snakeCase = require('snake-case');
const appendQuery = require('append-query');

const users = require('./users');
const posts = require('./posts');
const channels = require('./channels');
const messages = require('./messages');
const system = require('./system');

/**
 * pnut-butter.js
 *
 * Wrapper library for the pnut.io API.
 *
 * @returns {Object}
 */
const pnut = () => {

  const api = {
    base: 'https://api.pnut.io/v0',
    token: '',

    request(endpoint, {
      httpMethod = 'GET',
      params = {},
      resultAs = 'json',
      data = {}
    } = {}) {
      let auth = {};
      if (this.token !== '') {
        auth = {
          "Authorization": `Bearer ${this.token}`
        };
      }

      let options = {
        method: httpMethod,
        headers: auth
      };

      if (httpMethod !== 'GET' && Object.keys(data).length > 0) {
        options.body = JSON.stringify(data);
        options.headers['Content-Type'] = 'application/json';
      }

      /**
       * We do some magic here to allow any arbitrary URI parameter written
       * camelCase, snake_case or any-other-case too.
       * TODO: This should be extract into a separate module that handles the
       * URL construction.
       */
      const sanitizedParams = {};
      Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
          sanitizedParams[snakeCase(key)] = params[key].join(',');
        } else {
          sanitizedParams[snakeCase(key)] = params[key];
        }
      });
      const uri = appendQuery(`${this.base}${endpoint}`, sanitizedParams, { encodeComponents: false });

      return fetch(uri, options).then(function (response) {
        if (resultAs === 'response') {
          return response;
        } else {
          return response[resultAs]();
        }
      });
    }
  };

  return Object.assign(
    {
      /**
       * Set auth token.
       * @param {string} newToken - API access token
       */
      set token(newToken) {
        api.token = newToken;
      },

      /**
       * Send request with custom endpoint / parameters.
       * @param {string} endpoint - The custom call
       * @param {string} method - HTTP verb, defaults to GET
       * @return {Promise}
       */
      custom(endpoint, method = 'GET', data = {}) {
        endpoint = endpoint.startsWith('/') ? `${endpoint}` : `/${endpoint}`;
        return api.request(`${endpoint}`, { httpMethod: method, data: data });
      },

      /**
      * Generate a URL for client side authentication.
      * @param {string} - Client ID token
      * @param {string} redirectURI - URI you want to be redirected at
      * @param {Object} [scope] - The scope you want to request
      * @returns {string} - A ready-to-use authentication url
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
        url += `&redirect_uri=${redirectURI}`;
        url += `&scope=${Object.keys(scope).join(',')}`;
        url += `&response_type=token`;

        return url;
      },
    },

    users(api),
    posts(api),
    channels(api),
    messages(api),
    system(api)
  );
};

module.exports = pnut();
