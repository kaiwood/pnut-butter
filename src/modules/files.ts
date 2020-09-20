/**
 * {@link https://pnut.io/docs/api/resources/files}
 * @module files
 */
export default (api) => {
  return {
    /**
     * Retrieve a list of files created by the authenticated user.
     * @see https://pnut.io/docs/api/resources/files/lookup#get-users-me-files
     * @example
     * const { meta, data } = await pnut.fileList();
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    fileList(params = {}) {
      return api.request("/users/me/files", { params });
    },

    /**
     * Retrieve a file object. If link_expires_at is passed,
     * this will update the link and any embedded references to it.
     * @see https://pnut.io/docs/api/resources/files/lookup#get-files-id
     * @example
     * const { meta, data } = await pnut.file(69);
     * @param {string|Number} id - File id
     * @returns {Promise}
     */
    file(id, params = {}) {
      return api.request(`/files/${id}`, { params });
    },

    /**
     * Retrieve a list of specified file objects. Only returns the first 200 found.
     * @see https://pnut.io/docs/api/resources/files/lookup#get-files
     * @example
     * const { meta, data } = await pnut.files(69, 71);
     * @param {...string|Number} ids - File ids
     * @returns {Promise}
     */
    files(...fileIds) {
      return api.request("/files", { params: { ids: fileIds } });
    },
  };
};
