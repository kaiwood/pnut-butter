"use strict";

/**
 * Stream markers
 * @module stream_markers
 */
export default (api) => {
  return {
    /**
     * Set a single stream marker.
     *
     * Valid values for the "name" argument are:
     * - global
     * - personal
     * - mentions
     * - channel:id
     * @example
     * pnut.marker("channel:18", 15100).then(res => {
     *  console.log(res);
     * });
     * @param {string} name - Name of the markable stream
     * @param {string|number} id - ID of the post / message
     * @returns {Promise}
     */
    marker(name, id) {
      return api.request(`/markers`, {
        httpMethod: "POST",
        data: [
          {
            name: name,
            id: id,
          },
        ],
      });
    },

    /**
     * Set up to 10 markers at once, like described in the pnut docs.
     *
     * @example
     * pnut.markers([
     *     { name: "channel:18", id: 15100 },
     *     { name: "channel:19", id: 15101 }
     * ]).then(res => console.log(res));
     * @param {array} markerObjects - An array of marker objects
     * @returns {Promise}
     */
    markers(markerObjects = []) {
      return api.request(`/markers`, {
        httpMethod: "POST",
        data: markerObjects,
      });
    },
  };
};
