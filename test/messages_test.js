const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../lib/pnut");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base)
    .get("/somewhere")
    .reply(200, {});

  nock(base)
    .get("/channels/1/messages/1")
    .reply(200, {});

  nock(base)
    .get("/channels/1/messages/1/thread")
    .reply(200, {});

  nock(base)
    .get("/channels/messages?ids=1,2,3")
    .reply(200, {});

  nock(base)
    .get("/channels/1/messages")
    .reply(200, {});

  nock(base)
    .get("/users/me/messages")
    .reply(200, {});

  nock(base)
    .post("/channels/1/messages", {
      text: "An important message"
    })
    .reply(200, {});

  nock(base)
    .delete("/channels/1/messages/1")
    .reply(200, {});

  nock(base)
    .get("/channels/1/sticky_messages")
    .reply(200, {});

  nock(base)
    .put("/channels/1/messages/1/sticky")
    .reply(200, {});

  nock(base)
    .delete("/channels/1/messages/1/sticky")
    .reply(200, {});

  nock(base)
    .post("/channels/pm/messages", {
      destinations: ["@kwood"],
      text: "A new PM to a single user"
    })
    .reply(200, {});

  nock(base)
    .post("/channels/pm/messages", {
      destinations: [1, 5, "@kwood"],
      text: "A new PM to multiple users"
    })
    .reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("Messages", () => {
  it("should be able to retrieve a message from a channel", () => {
    return pnut.message(1, 1).should.become({});
  });

  it("should be able to retrieve a thread of messages", () => {
    return pnut.messageThread(1, 1).should.become({});
  });

  it("should be able to find specified message", () => {
    return pnut.messages(1, 2, 3).should.become({});
  });

  it("should be able to retrieve messages from a channel", () => {
    return pnut.channelMessages(1).should.become({});
  });

  it("should be able to retrieve a list of the authenticated users messages (pnut.usersMessages)", () => {
    return pnut.personalMessages().should.become({});
  });

  it("should be able to send a message", () => {
    return pnut.createMessage(1, "An important message").should.become({});
  });

  it("should be able to delete a message", () => {
    return pnut.deleteMessage(1, 1).should.become({});
  });

  it("should be able to retrieve a list of sticky messages (pnut.stickies)", () => {
    return pnut.stickies(1).should.become({});
  });

  it("should be able to create a sticky", () => {
    return pnut.sticky(1, 1).should.become({});
  });

  it("should be able to delete a sticky", () => {
    return pnut.unsticky(1, 1).should.become({});
  });

  it("should be able to send a private message to a user", () => {
    return pnut
      .sendMessage("@kwood", "A new PM to a single user")
      .should.become({});
  });

  it("should be able to send private messages to multiple users", () => {
    return pnut
      .sendMessage([1, 5, "@kwood"], "A new PM to multiple users")
      .should.become({});
  });
});
