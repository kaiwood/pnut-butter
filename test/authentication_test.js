const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

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
  it("should fail when no client id is given", () => {
    expect(() => pnut.authenticateClientURL("", "http://github.com")).to.throw(
      Error
    );
  });

  it("should fail if no redirect uri is given", () => {
    expect(() => pnut.authenticateClientURL("sometoken", "")).to.throw(Error);
  });

  it("should give back a correct url where the client can authenticate", () => {
    let expectedURL =
      "https://pnut.io/oauth/authenticate?client_id=mytoken&redirect_uri=http://github.com&scope=basic,stream,write_post,follow,update_profile,presence,messages,public_messages&response_type=token";

    expect(pnut.authenticateClientURL("mytoken", "http://github.com")).to.equal(
      expectedURL
    );
  });

  it("should be able to request an app access token", () => {
    return pnut.requestAppAccessToken("foo", "bar").should.become({});
  });
});
