const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../lib/pnut");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base).get("/posts/streams/explore/conversations").reply(200, {});
  nock(base).get("/posts/streams/explore/photos").reply(200, {});
  nock(base).get("/posts/streams/explore/trending").reply(200, {});
});

describe("Explore", () => {
  it("should be able to fetch the 'explore conversations' stream", () => {
    return pnut.conversations().should.become({});
  });

  it("should be able to fetch the 'explore photos' stream", () => {
    return pnut.photos().should.become({});
  });

  it("should be able to fetch the 'explore trending' stream", () => {
    return pnut.trending().should.become({});
  });
});
