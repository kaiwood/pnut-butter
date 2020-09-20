"use strict";

/**
 * Authentication
 * @module authentication
 */
module.exports = api => {
  return {
    /**
      * Generate a URL for client side authentication.
      * @param {string} - Client ID token
      * @param {string} redirectURI - URI you want to be redirected at
      * @param {Object} [scope] - The scope you want to request
      * @returns {string} - A ready-to-use authentication url
      */
    authenticateClientURL(
      clientId = "",
      redirectURI = "",
      scope = {
        basic: true,
        stream: true,
        write_post: true,
        follow: true,
        update_profile: true,
        presence: true,
        messages: true,
        public_messages: true
      }
    ) {
      if (clientId.length < 1) {
        throw new Error("You need a client ID for this request");
      } else if (redirectURI.length < 1) {
        throw new Error("You need a redirect URI for this request");
      }

      let url = `https://pnut.io/oauth/authenticate?`;
      url += `client_id=${clientId}`;
      url += `&redirect_uri=${redirectURI}`;
      url += `&scope=${Object.keys(scope).join(",")}`;
      url += `&response_type=token`;

      return url;
    },

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
