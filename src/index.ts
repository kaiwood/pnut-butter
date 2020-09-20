require("es6-promise").polyfill();
require("isomorphic-fetch");

import FormData from "form-data";

import snakeCase from "snake-case";
import appendQuery from "append-query";

import authentication from "./authentication";
import users from "./users";
import posts from "./posts";
import explore from "./explore";
import channels from "./channels";
import streamMarkers from "./stream_markers";
import messages from "./messages";
import system from "./system";
import appStreams from "./app_streams";
import clients from "./clients";
import files from "./files";
import polls from "./polls";

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
    clients(api),
    files(api),
    polls(api)
  );
};

module.exports = pnut();
