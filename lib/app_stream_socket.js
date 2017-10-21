const WebSocket = require("faye-websocket");
const ON_DEATH = require("death");
const pnut = require("./pnut");
const streamBase = "wss://stream.pnut.io/v0";

/**
 * Create and return a websocket with an app stream.
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
