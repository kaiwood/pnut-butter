"use strict";

/**
 * Posts
 * @module posts
 */
module.exports = api => {
  return {
    /**
     * A stream of all users' public posts.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    global(params = {}) {
      return api.request(`/posts/streams/global`, { params: params });
    },

    /**
     * The authenticated user's stream of posts from their followers and themself.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    personal(params = {}) {
      return api.request("/posts/streams/me", { params: params });
    },

    /**
     * A combined Personal Stream including the authenticated user's mentions.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    unified(params = {}) {
      return api.request("/posts/streams/unified", { params: params });
    },

    /**
     * Retrieve a post object.
     * @param {string|Number} postId - A post id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    post(postId, params = {}) {
      return api.request(`/posts/${postId}`, { params: params });
    },

    /**
     * Retrieve a list of specified post objects. Only retrieves the first 200 found.
     * @param {...string|Number} ids - Post ids, max 200
     * @returns {Promise}
     */
    posts(...ids) {
      // TODO: Maybe we need additional parameters here too?
      return api.request(`/posts`, { params: { ids: ids } });
    },

    /**
     * Retrieve a list of previous versions of a post, not including the most recent.
     * @param {string|Number} postId - A post id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    revisions(postId, params = {}) {
      return api.request(`/posts/${postId}/revisions`, { params: params });
    },

    /**
     * Retrieve a stream of all posts that include the specified tag.
     * @param {string} tag – A tag name
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    postsTaggedWith(tag, params = {}) {
      return api.request(`/posts/tag/${encodeURI(tag)}`, { params: params });
    },

    /**
     * Retrieve posts within a thread.
     * @param {string|Number} postId - A post id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    thread(postId, params = {}) {
      return api.request(`/posts/${postId}/thread`, { params: params });
    },

    /**
     * Retrieve actions executed against a post.
     * @param {string|Number} postId - A post id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    actions(postId, params = {}) {
      return api.request(`/posts/${postId}/actions`, { params: params });
    },

    /**
     * Retrieve actions executed against the authenticated user and their posts.
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    usersActions(params = {}) {
      return api.request("/users/me/actions", { params: params });
    },

    /**
     * Create a post.
     *
     * @example
     * pnut.createPost("An awesome post").then(res => {
     *  console.log(res);
     * });
     * @example
     * pnut.createPost("An awesome post", {nsfw: true}).then(res => {
     *  console.log(res);
     * });
     * @example
     * pnut.createPost("An awesome post", {
     *  nsfw: true
     *  replyTo: 1234,
     *  parseLinks: false,
     *  parseMarkdownLinks: false
     * }).then(res => {
     *  console.log(res);
     * });
     * @param {string} text - text for a new post
     * @param {Object} [options] - Optional arguments
     * @param {boolean} [options.nsfw] - Optional boolean whether the post should be marked as "NSFW" (Not Safe For Work/mature/offensive)
     * @param {string|Number} [options.replyTo] - Optional ID of another post to reply to
     * @param {boolean} [options.parseLinks] - Optional boolean whether the links should be parsed by the server. Defaults to true.
     * @param {boolean} [options.parseMarkdownLinks] - Optional boolean whether the markdown links should be parsed by the server. Defaults to true.
     * @returns {Promise}
     */
    createPost(text, options = {}) {
      let { nsfw, replyTo, parseLinks, parseMarkdownLinks } = options;
      let data = {};

      data.text = text;

      if (nsfw) data.is_nsfw = 1;
      if (replyTo) data.reply_to = replyTo;
      if (parseLinks !== undefined || parseMarkdownLinks !== undefined)
        data.entities = {};
      if (parseLinks !== undefined)
        data.entities.parse_links = Number(parseLinks);
      if (parseMarkdownLinks !== undefined)
        data.entities.parse_markdown_links = Number(parseLinks);

      return api.request("/posts", {
        httpMethod: "POST",
        data: data
      });
    },

    /**
     * Edit / revise a post.
     * @param {string|Number} postId - A post id
     * @param {string} newText - new text for a post
     * @returns {Promise}
     */
    updatePost(postId, newText) {
      return api.request(`/posts/${postId}`, {
        httpMethod: "PUT",
        data: {
          text: newText
        }
      });
    },

    /**
     * Delete a post.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    deletePost(postId) {
      return api.request(`/posts/${postId}`, {
        httpMethod: "DELETE"
      });
    },

    /**
     * Repost another post.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    repost(postId) {
      return api.request(`/posts/${postId}/repost`, {
        httpMethod: "PUT"
      });
    },

    /**
     * Delete a repost.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    deleteRepost(postId) {
      return api.request(`/posts/${postId}/repost`, {
        httpMethod: "DELETE"
      });
    },

    /**
     * Retrieve a list of bookmarks made by the specified user.
     * @param {string|Number} userId - A post id
     * @param {Object} [params] - Additional URI parameters
     * @returns {Promise}
     */
    bookmarks(userId, params = {}) {
      return api.request(`/users/${userId}/bookmarks`, { params: params });
    },

    /**
     * Bookmark a post.
     * @param {string} postId - A post id
     * @returns {Promise}
     */
    bookmark(postId) {
      return api.request(`/posts/${postId}/bookmark`, {
        httpMethod: "PUT"
      });
    },

    /**
     * Remove a bookmark for a post.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    deleteBookmark(postId) {
      return api.request(`/posts/${postId}/bookmark`, {
        httpMethod: "DELETE"
      });
    }
  };
};
