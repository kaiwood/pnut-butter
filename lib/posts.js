'use strict';

/**
 * Post related endpoints
 */
module.exports = (api) => {
  return {
    /**
     * Retrieve a post object.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    post(postId) {
      return api.request(`/posts/${postId}`);
    },

    /**
     * Retrieve a list of specified post objects. Only retrieves the first 200 found
     * @param {string|Number} ids - An array of post ids
     * @returns {Promise}
     */
    posts(...ids) {
      return api.request(`/posts?ids=${ids.join(',')}`);
    },

    /**
     * Retrieve a list of previous versions of a post, not including the most recent.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    revisions(postId) {
      return api.request(`/posts/${postId}/revisions`);
    },

    /**
     * Retrieve a stream of all posts that include the specified tag.
     * @param {string} tag – The tag name
     * @returns {Promise}
     */
    postsTaggedWith(tag) {
      return api.request(`/posts/tag/${encodeURI(tag)}`);
    },

    /**
     * Retrieve posts within a thread.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    thread(postId) {
      return api.request(`/posts/${postId}/thread`);
    },

    /**
     * Retrieve actions executed against a post.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    actions(postId) {
      return api.request(`/posts/${postId}/actions`);
    },

    /**
     * Retrieve actions executed against the authenticated user and their posts.
     */
    usersActions() {
      return api.request('/users/me/actions');
    },

    /**
     * Create a post.
     *
     * @param {string} text - text for the new post
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
     * Edit / revise a post
     *
     * @param {string} postId - id of a post
     * @param {string} newText - new text for the post
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
     * Delete a post
     *
     * @param {string} postId - id of a post
     */
    deletePost(postId) {
      return api.request(`/posts/${postId}`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Repost another post
     *
     * @param {string} postId - id of a post
     */
    repost(postId) {
      return api.request(`/posts/${postId}/repost`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Delete a repost
     *
     * @param {string} postId - id of a post
     */
    deleteRepost(postId) {
      return api.request(`/posts/${postId}/repost`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve a list of bookmarks made by the specified user.
     *
     * @param {string} userId - id of a user
     */
    bookmarks(userId) {
      return api.request(`/users/${userId}/bookmarks`);
    },

    /**
     * Bookmark a post.
     *
     * @param {string} postId - id of a post
     */
    bookmark(postId) {
      return api.request(`/posts/${postId}/bookmark`, {
        httpMethod: 'PUT'
      });
    },

    deleteBookmark(postId) {
      return api.request(`/posts/${postId}/bookmark`, {
        httpMethod: 'DELETE'
      });
    }

  };
};