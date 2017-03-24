'use strict';

/**
 * Post related endpoints.
 */
module.exports = (api) => {
  return {
    /**
     * Retrieve a post object.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    post(postId) {
      return api.request(`/posts/${postId}`);
    },

    /**
     * Retrieve a list of specified post objects. Only retrieves the first 200 found.
     * @param {...string|Number} ids - Post ids, max 200
     * @returns {Promise}
     */
    posts(...ids) {
      return api.request(`/posts?ids=${ids.join(',')}`);
    },

    /**
     * Retrieve a list of previous versions of a post, not including the most recent.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    revisions(postId) {
      return api.request(`/posts/${postId}/revisions`);
    },

    /**
     * Retrieve a stream of all posts that include the specified tag.
     * @param {string} tag – A tag name
     * @returns {Promise}
     */
    postsTaggedWith(tag) {
      return api.request(`/posts/tag/${encodeURI(tag)}`);
    },

    /**
     * Retrieve posts within a thread.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    thread(postId) {
      return api.request(`/posts/${postId}/thread`);
    },

    /**
     * Retrieve actions executed against a post.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    actions(postId) {
      return api.request(`/posts/${postId}/actions`);
    },

    /**
     * Retrieve actions executed against the authenticated user and their posts.
     * @returns {Promise}
     */
    usersActions() {
      return api.request('/users/me/actions');
    },

    /**
     * Create a post.
     * @param {string} text - text for a new post
     * @returns {Promise}
     */
    createPost(text) {
      return api.request('/posts', {
        httpMethod: 'POST',
        data: {
          text: text
        }
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
        httpMethod: 'PUT',
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
        httpMethod: 'DELETE'
      });
    },

    /**
     * Repost another post.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    repost(postId) {
      return api.request(`/posts/${postId}/repost`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Delete a repost.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    deleteRepost(postId) {
      return api.request(`/posts/${postId}/repost`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve a list of bookmarks made by the specified user.
     * @param {string|Number} userId - A post id
     * @returns {Promise}
     */
    bookmarks(userId) {
      return api.request(`/users/${userId}/bookmarks`);
    },

    /**
     * Bookmark a post.
     * @param {string} postId - A post id
     * @returns {Promise}
     */
    bookmark(postId) {
      return api.request(`/posts/${postId}/bookmark`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Remove a bookmark for a post.
     * @param {string|Number} postId - A post id
     * @returns {Promise}
     */
    deleteBookmark(postId) {
      return api.request(`/posts/${postId}/bookmark`, {
        httpMethod: 'DELETE'
      });
    }
  };
};