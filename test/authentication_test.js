const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../lib/pnut");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base)
    .post("/oauth/access_token", () => {
      return true;
    })
    .reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("Authentication", () => {
  it("should be able to request an app access token", () => {
    return pnut.requestAppAccessToken("foo", "bar").should.become({});
  });
});
