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
      return api.call(`/posts/${postId}`);
    },

    /**
     * Retrieve a list of specified post objects. Only retrieves the first 200 found
     * @param {array} ids - An array of post ids
     * @returns {Promise}
     */
    posts(ids) {
      return api.call(`/posts?ids=${ids.join(',')}`);
    },

    /**
     * Retrieve a list of previous versions of a post, not including the most recent.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    revisions(postId) {
      return api.call(`/posts/${postId}/revisions`);
    },

    /**
     * Retrieve a stream of all posts that include the specified tag.
     * @param {string} tag – The tag name
     * @returns {Promise}
     */
    postsTaggedWith(tag) {
      return api.call(`/posts/tag/${encodeURI(tag)}`);
    },

    /**
     * Retrieve posts within a thread.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    thread(postId) {
      return api.call(`/posts/${postId}/thread`);
    },

    /**
     * Retrieve actions executed against a post.
     * @param {string} postId - The post id
     * @returns {Promise}
     */
    actions(postId) {
      return api.call(`/posts/${postId}/actions`);
    },

    /**
     * Retrieve actions executed against the authenticated user and their posts.
     */
    usersActions() {
      return api.call('/users/me/actions');
    },

    /**
     * Create a post.
     *
     * @param {string} text - text for the new post
     */
    createPost(text) {
      return api.call('/posts', {
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
      return api.call(`/posts/${postId}`, {
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
      return api.call(`/posts/${postId}`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Repost another post
     *
     * @param {string} postId - id of a post
     */
    repost(postId) {
      return api.call(`/posts/${postId}/repost`, {
        httpMethod: 'PUT'
      });
    },

    /**
     * Delete a repost
     *
     * @param {string} postId - id of a post
     */
    deleteRepost(postId) {
      return api.call(`/posts/${postId}/repost`, {
        httpMethod: 'DELETE'
      });
    },

    /**
     * Retrieve a list of bookmarks made by the specified user.
     *
     * @param {string} userId - id of a user
     */
    bookmarks(userId) {
      return api.call(`/users/${userId}/bookmarks`);
    },

    /**
     * Bookmark a post.
     *
     * @param {string} postId - id of a post
     */
    bookmark(postId) {
      return api.call(`/posts/${postId}/bookmark`, {
        httpMethod: 'PUT'
      });
    },

    deleteBookmark(postId) {
      return api.call(`/posts/${postId}/bookmark`, {
        httpMethod: 'DELETE'
      });
    }

  };
};