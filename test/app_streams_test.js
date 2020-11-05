const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../dist/index");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base).get("/streams").reply(200, {});
  nock(base).get("/streams/post").reply(200, {});
  nock(base)
    .post("/streams", {
      type: "long_poll",
      object_types: ["post", "message", "channel_subscription", "bookmark"],
      key: "jelly"
    })
    .reply(200, {});

  nock(base)
    .put("/streams", {
      object_types: ["post", "message"],
      key: "jelly"
    })
    .reply(200, {});

  nock(base).delete("/streams").reply(200, {});
  nock(base).delete("/streams/jelly").reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("App Streams", () => {
  it("should be able to get all app streams for the authenticated app", () => {
    return pnut.streams().should.become({});
  });

  it("should be able to get a specific app stream by its key", () => {
    return pnut.stream("post").should.become({});
  });

  it("should be able to create an app stream for the authenticated app", () => {
    return pnut
      .createStream({
        objectTypes: ["post", "message", "channel_subscription", "bookmark"],
        key: "jelly"
      })
      .should.become({});
  });

  it("should be able to update an app stream", () => {
    return pnut
      .updateStream({
        objectTypes: ["post", "message"],
        key: "jelly"
      })
      .should.become({});
  });

  it("should be able to delete all app streams for the authorized app", () => {
    return pnut.deleteStreams().should.become({});
  });

  it("should be able to delete a specific app stream by its key", () => {
    return pnut.deleteStream("jelly").should.become({});
  });
});
