require("es6-promise").polyfill();
require("isomorphic-fetch");
const FormData = require("form-data");

const snakeCase = require("snake-case");
const appendQuery = require("append-query");

const authentication = require("./authentication");
const users = require("./users");
const posts = require("./posts");
const explore = require("./explore");
const channels = require("./channels");
const streamMarkers = require("./stream_markers");
const messages = require("./messages");
const system = require("./system");
const appStreams = require("./app_streams");
const clients = require("./clients");

/**
 * pnut-butter.js
 *
 * Wrapper library for the pnut.io API.
 *
 * @returns {Object}
 */
const pnut = () => {
  const api = {
    base: "https://api.pnut.io/v0",
    streamBase: "wss://stream.pnut.io/v0",
    token: "",

    request(
      endpoint,
      {
        httpMethod = "GET",
        params = {},
        resultAs = "json",
        dataAs = "json",
        data = {}
      } = {}
    ) {
      let auth = {};
      if (this.token !== "") {
        auth = {
          Authorization: `Bearer ${this.token}`
        };
      }

      let options = {
        method: httpMethod,
        headers: auth
      };

      if (httpMethod !== "GET" && Object.keys(data).length > 0) {
        if (dataAs === "json") {
          options.body = JSON.stringify(data);
          options.headers["Content-Type"] = "application/json";
        } else if (dataAs === "form") {
          let form = new FormData();
          Object.keys(data).forEach(key => form.append(key, data[key]));
          options.body = form;
        } else if (dataAs === "dom-node") {
          let form = new FormData(data);
          options.body = form;
        }
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
          sanitizedParams[snakeCase(key)] = params[key].join(",");
        } else {
          sanitizedParams[snakeCase(key)] = params[key];
        }
      });
      const uri = appendQuery(`${this.base}${endpoint}`, sanitizedParams, {
        encodeComponents: false
      });

      return fetch(uri, options).then(function(response) {
        if (resultAs === "response") {
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
       * Return the auth token that was set.
       * @returns {string}
       */
      get token() {
        return api.token;
      },

      /**
       * Send request with custom endpoint / parameters.
       * @param {string} endpoint - The custom call
       * @param {string} method - HTTP verb, defaults to GET
       * @return {Promise}
       */
      custom(endpoint, method = "GET", data = {}) {
        endpoint = endpoint.startsWith("/") ? `${endpoint}` : `/${endpoint}`;
        return api.request(`${endpoint}`, {
          httpMethod: method,
          data: data
        });
      }
    },
    authentication(api),
    users(api),
    posts(api),
    explore(api),
    channels(api),
    streamMarkers(api),
    messages(api),
    system(api),
    appStreams(api),
    clients(api)
  );
};

module.exports = pnut();
