const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../dist/index");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base)
    .post("/markers", [
      {
        name: "channel:18",
        id: 15100
      }
    ])
    .reply(200, {});

  nock(base)
    .post("/markers", [
      {
        name: "channel:18",
        id: 15100
      },
      {
        name: "channel:19",
        id: 15101
      }
    ])
    .reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("Stream markers", () => {
  it("should be able to update a single stream marker", () => {
    return pnut.marker("channel:18", 15100).should.become({});
  });

  it("should be able to update a multiple stream markers", () => {
    return pnut
      .markers([
        { name: "channel:18", id: 15100 },
        { name: "channel:19", id: 15101 }
      ])
      .should.become({});
  });
});
