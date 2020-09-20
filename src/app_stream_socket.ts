const WebSocket = require("faye-websocket");
const ON_DEATH = require("death");
const pnut = require("./pnut");
const streamBase = "wss://stream.pnut.io/v0";

/**
 * Create and return a websocket with an app stream.
 * @module app_stream_socket
 * @example
 * const pnut = require("pnut-butter");
 * pnut.token = "MY_VALID_ACCESS_TOKEN";
 *
 * const AppStreamSocket = require("pnut-butter/dist/app_stream_socket");
 * const ws = AppStreamSocket("myfancykeyname");
 *
 * ws.on("open", event => {
 *   console.log("Opening app stream");
 * });
 *
 * ws.on("message", event => {
 *   console.log(event.data);
 * });
 *
 * ws.on("close", event => {
 *   console.log("Closing app stream", event.code, event.reason);
 * });
 * @param {string} streamKey - A valid stream key
 * @returns {Object} - A connected websocket
 */
module.exports = function(streamKey) {
  const ws = new WebSocket.Client(
    `${streamBase}/app/stream?access_token=${pnut.token}&key=${streamKey}`,
    null,
    { ping: 45 }
  );

  ON_DEATH((signal, err) => {
    if (err) {
      console.log(err);
    }

    ws.close(1000, "");
    process.exit(0);
  });

  return ws;
};
