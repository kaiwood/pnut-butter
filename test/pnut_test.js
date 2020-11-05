const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../dist/index");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base).get("/somewhere").reply(200, {});

  nock(base).post("/somewhere").reply(200, {});

  nock(base).put("/somewhere").reply(200, {});

  nock(base).patch("/somewhere").reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("The pnut-butter library", () => {
  it("should be able to send a custom GET request", () => {
    return pnut.custom("/somewhere").should.become({});
  });

  it("should be able to send a custom POST request", () => {
    return pnut.custom("/somewhere", "POST", {
      text: "sometext"
    });
  });

  it("should be able to send a custom PUT request", () => {
    return pnut.custom("/somewhere", "PUT", {
      text: "sometext"
    });
  });

  it("should be able to send a custom PATCH request", () => {
    return pnut.custom("/somewhere", "PATCH", {
      text: "sometext"
    });
  });
});
