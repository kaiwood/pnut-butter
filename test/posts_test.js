const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../dist/index");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base)
    .get("/posts/1")
    .reply(200, {});

  nock(base)
    .get("/posts?ids=4,12,1000")
    .reply(200, {});

  nock(base)
    .get("/posts/1/revisions")
    .reply(200, {});

  nock(base)
    .get("/posts/tag/pnut-butter")
    .reply(200, {});

  nock(base)
    .get("/posts/1/thread")
    .reply(200, {});

  nock(base)
    .get("/posts/1/actions")
    .reply(200, {});

  nock(base)
    .get("/users/me/actions")
    .reply(200, {});

  nock(base)
    .post("/posts", {
      text: "An awesome post"
    })
    .reply(200, {});

  nock(base)
    .post("/posts", {
      text: "An awesome post",
      is_nsfw: 1
    })
    .reply(200, {});

  nock(base)
    .post("/posts", {
      text: "An awesome post",
      is_nsfw: 1,
      reply_to: 1234,
      entities: {
        parse_links: 0,
        parse_markdown_links: 0
      }
    })
    .reply(200, {});

  nock(base)
    .post("/posts", {
      text: "A post with raw data",
      raw: {
        type: "io.pnut.core.language",
        value: {
          language: "en"
        }
      }
    })
    .reply(200, {});

  nock(base)
    .put("/posts/1000", {
      text: "A revised, but still awesome post"
    })
    .reply(200, {});

  nock(base)
    .delete("/posts/1000")
    .reply(200, {});

  nock(base)
    .put("/posts/1000/repost")
    .reply(200, {});

  nock(base)
    .delete("/posts/1000/repost")
    .reply(200, {});

  nock(base)
    .get("/users/1/bookmarks")
    .reply(200, {});

  nock(base)
    .put("/posts/1000/bookmark")
    .reply(200, {});

  nock(base)
    .delete("/posts/1000/bookmark")
    .reply(200, {});

  nock(base)
    .get("/posts/streams/global")
    .reply(200, {
      data: [{ id: 2000 }, { id: 2001 }]
    });

  nock(base)
    .get("/posts/streams/global?before_id=2000")
    .reply(200, {
      data: [{ id: 1998 }, { id: 1999 }]
    });

  nock(base)
    .get("/posts/streams/me")
    .reply(200, {});

  nock(base)
    .get("/posts/streams/unified")
    .reply(200, {});

  nock(base)
    .get("/posts/search?tags=mndp,MondayNightDanceParty")
    .reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("Posts", () => {
  it("should be able to fetch the the global timeline", () => {
    return pnut.global().should.become({
      data: [{ id: 2000 }, { id: 2001 }]
    });
  });

  it("should be able to fetch the global timeline with additional parameters", () => {
    return pnut.global({ beforeId: 2000 }).should.become({
      data: [{ id: 1998 }, { id: 1999 }]
    });
  });

  it("should be able to fetch the personal stream", () => {
    return pnut.personal().should.become({});
  });

  it("should be able to fetch a unified streams", () => {
    return pnut.unified().should.become({});
  });

  it("should be able to fetch a post by id", () => {
    return pnut.post(1).should.become({});
  });

  it("should be able to fetch an array of posts by their ids", () => {
    return pnut.posts(4, 12, 1000).should.become({});
  });

  it("should be able to fetch revisions of posts", () => {
    return pnut.revisions(1).should.become({});
  });

  it("should be able to fetch mentions for a specific user", () => {
    return pnut.mentions(1).should.become({});
  });

  it("should be able to fetch posts of a specific user", () => {
    return pnut.postsFrom(1).should.become({});
  });

  it("should be able to fetch posts by tags", () => {
    return pnut.postsTaggedWith("pnut-butter").should.become({});
  });

  it("should be able to fetch posts within a thread", () => {
    return pnut.thread("1").should.become({});
  });

  it("should be able to fetch actions executed against a post", () => {
    return pnut.actions("1").should.become({});
  });

  it("should be able to fetch actions for the posts of the authenticated user", () => {
    return pnut.usersActions().should.become({});
  });

  it("should be able to create a new post", () => {
    return pnut.createPost("An awesome post").should.become({});
  });

  it("should be able to create a new post with a single additional option", () => {
    return pnut.createPost("An awesome post", { nsfw: true });
  });

  it("should be able to create a new post with additional options", () => {
    return pnut
      .createPost("An awesome post", {
        nsfw: true,
        replyTo: 1234,
        parseLinks: false,
        parseMarkdownLinks: false
      })
      .should.become({});
  });

  it("should be able to create a new post with raw parameters ", () => {
    return pnut.createPost("A post with raw data", {
      raw: {
        type: "io.pnut.core.language",
        value: {
          language: "en"
        }
      }
    });
  });

  it("should be able to edit a post", () => {
    return pnut
      .updatePost(1000, "A revised, but still awesome post")
      .should.become({});
  });

  it("should be able to delete a post", () => {
    return pnut.deletePost(1000).should.become({});
  });

  it("should be able to repost something", () => {
    return pnut.repost(1000).should.become({});
  });

  it("should be able to delete a repost", () => {
    return pnut.deleteRepost(1000).should.become({});
  });

  it("should be able to fetch a list of posts bookmarked by a user", () => {
    return pnut.bookmarks(1).should.become({});
  });

  it("should be able to bookmark a post", () => {
    return pnut.bookmark(1000).should.become({});
  });

  it("should be able to delete a bookmark", () => {
    return pnut.deleteBookmark(1000).should.become({});
  });

  it("should be possbible to search for posts", () => {
    return pnut
      .searchPosts({ tags: ["mndp", "MondayNightDanceParty"] })
      .should.become({});
  });
});
