"use strict";

/**
 * Authentication
 * @module authentication
 */
module.exports = api => {
  return {
    /**
     * Request an app access token
     * @param {string} clientId - The client id
     * @param {string} clientSecret - The client secret
     * @returns {Promise}
     */
    requestAppAccessToken(clientId, clientSecret) {
      return api.request("/oauth/access_token", {
        httpMethod: "POST",
        dataAs: "form",
        data: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials"
        }
      });
    }
  };
};
