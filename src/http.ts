import snakeCase from "snake-case";
import FormData from "form-data";
import appendQuery from "append-query";

export default {
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
      data = {},
    } = {}
  ) {
    let auth = {};
    if (this.token !== "") {
      auth = {
        Authorization: `Bearer ${this.token}`,
      };
    }

    let options = {
      method: httpMethod,
      headers: auth,
    };

    if (httpMethod !== "GET" && Object.keys(data).length > 0) {
      if (dataAs === "json") {
        options.body = JSON.stringify(data);
        options.headers["Content-Type"] = "application/json";
      } else if (dataAs === "form") {
        let form = new FormData();
        Object.keys(data).forEach((key) => form.append(key, data[key]));
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
    Object.keys(params).forEach((key) => {
      if (Array.isArray(params[key])) {
        sanitizedParams[snakeCase(key)] = params[key].join(",");
      } else {
        sanitizedParams[snakeCase(key)] = params[key];
      }
    });
    const uri = appendQuery(`${this.base}${endpoint}`, sanitizedParams, {
      encodeComponents: false,
    });

    return fetch(uri, options).then(function (response) {
      if (resultAs === "response") {
        return response;
      } else {
        return response[resultAs]();
      }
    });
  },
};
