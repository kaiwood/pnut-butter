const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../dist/index");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base)
    .get("/channels/1")
    .reply(200, {});

  nock(base)
    .get("/channels?ids=1,2,3")
    .reply(200, {});

  nock(base)
    .get("/users/me/channels")
    .reply(200, {});

  nock(base)
    .get("/users/me/channels/existing_pm?ids=1,2")
    .reply(200, {});

  nock(base)
    .get("/users/me/channels/num_unread/pm")
    .reply(200, {});

  nock(base)
    .delete("/users/me/channels/num_unread/pm")
    .reply(200, {});

  nock(base)
    .delete("/channels/1")
    .reply(200, {});

  nock(base)
    .get("/users/me/channels/subscribed")
    .reply(200, {});

  nock(base)
    .get("/channels/1/subscribers")
    .reply(200, {});

  nock(base)
    .put("/channels/1/subscribe")
    .reply(200, {});

  nock(base)
    .delete("/channels/1/subscribe")
    .reply(200, {});

  nock(base)
    .get("/users/me/channels/muted")
    .reply(200, {});

  nock(base)
    .put("/channels/1/mute")
    .reply(200, {});

  nock(base)
    .delete("/channels/1/mute")
    .reply(200, {});

  nock(base)
    .get(
      "/channels/search?is_public=1&channel_types=io.pnut.core.chat&categories=fun"
    )
    .reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("Channels", () => {
  it("should be able to fetch a single channel", () => {
    return pnut.channel(1).should.become({});
  });

  it("should be able to fetch multiple channels", () => {
    return pnut.channels(1, 2, 3).should.become({});
  });

  it("should be able to fetch channels created by the authenticated user", () => {
    return pnut.usersChannels().should.become({});
  });

  it("should be able to retrieve a private message channel for a set of users", () => {
    return pnut.pmChannelFor(1, 2).should.become({});
  });

  it("should be able to retrive to number of unread private messages", () => {
    return pnut.unread().should.become({});
  });

  it("should be able to mark all private messages as read", () => {
    return pnut.markAllAsRead().should.become({});
  });

  it("should be able to create a channel (pnut.createChannel)");
  it("should be able to update a channel (pnut.updateChannel");

  it("should be able to deactivate a channel", () => {
    return pnut.deactivateChannel(1).should.become({});
  });

  it("should be able to retrieve a list of subscribed channels", () => {
    return pnut.subscribed().should.become({});
  });

  it("should be able to retrieve a list of subscribers of a channel", () => {
    return pnut.subscribers(1).should.become({});
  });

  it("should be able to subscribe to a channel", () => {
    return pnut.subscribe(1).should.become({});
  });

  it("should be able to unsubscribe from a channel", () => {
    return pnut.unsubscribe(1).should.become({});
  });

  it("should be able to receive a list of muted channels", () => {
    return pnut.mutedChannels().should.become({});
  });

  it("should be able to mute a channel (pnut.muteChannel)", () => {
    return pnut.muteChannel(1).should.become({});
  });

  it("should be able to unmute a channel (pnut.unmuteChannel)", () => {
    return pnut.unmuteChannel(1).should.become({});
  });

  it("should be possible to search for channels", () => {
    return pnut
      .searchChannels({
        isPublic: 1,
        channelTypes: "io.pnut.core.chat",
        categories: "fun"
      })
      .should.become({});
  });
});
