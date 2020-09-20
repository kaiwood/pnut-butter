"use strict";

/**
 * Polls
 * {@link https://pnut.io/docs/api/resources/polls}
 * @module polls
 */

export default (api) => {
  return {
    /**
     * Create a poll placeholder or a complete poll.
     * @example
     * const { meta, data } = pnut.createPoll({
     *   type: "com.example.site",
     *   prompt: "Do you like Pnut?",
     *   options: [
     *     {
     *       text: "Yes"
     *     },
     *     {
     *       text: "Of course"
     *     }
     *   ],
     *   duration: "60",
     *   is_anonymous: "false"
     * });
     * @param {object} - A valid poll object
     * @returns {Promise}
     */
    createPoll(poll) {
      return api.request(`/polls`, {
        httpMethod: "POST",
        data: poll,
      });
    },

    /**
     * Respond to a poll object
     * @example
     * const { meta, data } = await pnut.respondToPoll(1, 2);
     * @param {string|Number} poll - A poll id
     * @param {string|number} position - A position
     * @returns {Promise}
     */
    respondToPoll(poll, position) {
      return api.request(`/polls/${poll}/response/${position}`, {
        httpMethod: "PUT",
      });
    },

    /**
     * Delete a poll
     * @example
     * const { meta, data } = await pnut.deletePoll(72);
     * @param {string|Number} pollId - A poll id
     * @returns {Promise}
     */
    deletePoll(pollId) {
      return api.request(`/polls/${pollId}`, {
        httpMethod: "DELETE",
      });
    },

    /**
     * Retrieve a poll objec
     * @example
     * const { meta, data } = await pnut.poll(1);
     * @param {string|Number} pollId - A poll id
     * @returns {Promise}
     */
    poll(pollId) {
      return api.request(`/polls/${pollId}`);
    },

    /**
     * Retrieve a list of polls created by the authenticated user.
     * @example
     * const { meta, data } = await pnut.myPolls();
     * @returns {Promise}
     */
    myPolls() {
      return api.request("/users/me/polls");
    },
  };
};
