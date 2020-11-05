require("es6-promise").polyfill();
require("isomorphic-fetch");

import authentication from "./modules/authentication";
import users from "./modules/users";
import posts from "./modules/posts";
import explore from "./modules/explore";
import channels from "./modules/channels";
import streamMarkers from "./modules/stream_markers";
import messages from "./modules/messages";
import system from "./modules/system";
import appStreams from "./modules/app_streams";
import clients from "./modules/clients";
import files from "./modules/files";
import polls from "./modules/polls";
import httpClient from "./http";

/**
 * pnut-butter.js
 *
 * Wrapper library for the pnut.io API.
 *
 * @returns {Object}
 */
const pnut = () => {
  return Object.assign(
    {
      /**
       * Set auth token.
       * @param {string} newToken - API access token
       */
      set token(newToken) {
        httpClient.token = newToken;
      },

      /**
       * Return the auth token that was set.
       * @returns {string}
       */
      get token() {
        return httpClient.token;
      },

      /**
       * Send request with custom endpoint / parameters.
       * @param {string} endpoint - The custom call
       * @param {string} method - HTTP verb, defaults to GET
       * @return {Promise}
       */
      custom(endpoint, method = "GET", data = {}) {
        endpoint = endpoint.startsWith("/") ? `${endpoint}` : `/${endpoint}`;
        return httpClient.request(`${endpoint}`, {
          httpMethod: method,
          data: data,
        });
      },
    },
    authentication(httpClient),
    users(httpClient),
    posts(httpClient),
    explore(httpClient),
    channels(httpClient),
    streamMarkers(httpClient),
    messages(httpClient),
    system(httpClient),
    appStreams(httpClient),
    clients(httpClient),
    files(httpClient),
    polls(httpClient)
  );
};

module.exports = pnut();
