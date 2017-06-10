const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const pnut = require("../lib/pnut");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base).get("/users/1").reply(200, {});

  nock(base).get("/users?ids=4,12,1000").reply(200, {});

  nock(base).get("/users/1/mentions").reply(200, {});

  nock(base).get("/users/1/posts").reply(200, {});

  nock(base).get("/users/1/avatar").reply(200, {});

  nock(base).get("/users/1/cover").reply(200, {});

  nock(base)
    .put("/users/me", { locale: "de_DE", timezone: "Europe/Berlin" })
    .reply(200, {});

  nock(base).patch("/users/me", { name: "pnut-butter user" }).reply(200, {});

  nock(base).get("/users/1/following").reply(200, {});

  nock(base).get("/users/1/followers").reply(200, {});

  nock(base).put("/users/2/follow").reply(200, {});

  nock(base).delete("/users/2/follow").reply(200, {});

  nock(base).get("/users/me/muted").reply(200, {});

  nock(base).put("/users/2/mute").reply(200, {});

  nock(base).delete("/users/2/mute").reply(200, {});

  nock(base).get("/users/me/blocked").reply(200, {});

  nock(base).put("/users/2/block").reply(200, {});

  nock(base).delete("/users/2/block").reply(200, {});

  nock(base).get("/presence").reply(200, {});

  nock(base).get("/presence/2").reply(200, {});

  nock(base).put("/users/me/presence").reply(200, {});

  nock(base)
    .put("/users/me/presence", { presence: "A presence message" })
    .reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("User endpoints", () => {
  it("should be able to fetch a user by id", () => {
    return pnut.user(1).should.become({});
  });

  it("should be able to fetch users by their ids", () => {
    return pnut.users(4, 12, 1000).should.become({});
  });

  it("should be able to fetch a users avatar", () => {
    expect(pnut.avatar(1)).to.be.fulfilled;
  });

  it("should be able to fetch a users cover", () => {
    expect(pnut.cover("1")).to.be.fulfilled;
  });

  it("should be able to update the profile with a single object", () => {
    return pnut
      .replaceProfile({
        locale: "de_DE",
        timezone: "Europe/Berlin"
      })
      .should.become({});
  });

  it("should be able to update only given parts of the profile", () => {
    return pnut
      .updateProfile({
        name: "pnut-butter user"
      })
      .should.become({});
  });

  it("should be able to retrieve a list of people a user follows", () => {
    return pnut.following(1).should.become({});
  });

  it("should be able to retrieve a list of people a user is following", () => {
    return pnut.followers(1).should.become({});
  });

  it("should be able to follow another user", () => {
    return pnut.follow(2).should.become({});
  });

  it("should be able to unfollow a user", () => {
    return pnut.unfollow(2).should.become({});
  });

  it("should be able to get a list of muted users", () => {
    return pnut.muted().should.become({});
  });

  it("should be able to mute a user", () => {
    return pnut.mute(2).should.become({});
  });

  it("should be able to unmute a user", () => {
    return pnut.unmute(2).should.become({});
  });

  it("should be able to get a list of blocked users", () => {
    return pnut.blocked(2).should.become({});
  });

  it("should be able to block a user", () => {
    return pnut.block(2).should.become({});
  });

  it("should be able to unblock a user", () => {
    return pnut.unblock(2).should.become({});
  });

  it("should be able to get presence information for all users", () => {
    return pnut.presence().should.become({});
  });

  it("should be able to get presence information of another user", () => {
    return pnut.presenceOf(2).should.become({});
  });

  it("should be able to update presence", () => {
    return pnut.updatePresence().should.become({});
  });

  it("should be able to update presence with an optional message", () => {
    return pnut.updatePresence("A presence message").should.become({});
  });
});
