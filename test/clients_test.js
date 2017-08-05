const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../lib/pnut");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base).get("/clients/3PFPMSet53RutGINA8e5HWqYg_UCDHad").reply(200, {});

  nock(base).get("/users/@33MHz/clients").reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("Clients", () => {
  it("should be possible to fetch a clients info by its id", () => {
    return pnut.client("3PFPMSet53RutGINA8e5HWqYg_UCDHad").should.become({});
  });

  it("should be possible to get all clients by a specific user", () => {
    return pnut.clientsByUser("@33MHz").should.become({});
  });
});
