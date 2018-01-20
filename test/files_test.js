const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
chai.use(chaiAsPromised);
chai.should();

const pnut = require("../lib/pnut");

before(function() {
  let base = "https://api.pnut.io/v0";

  nock(base)
    .get("/users/me/files")
    .reply(200, {});

  nock(base)
    .get("/files/69")
    .reply(200, {});

  nock(base)
    .get("/files?ids=69,71")
    .reply(200, {});
});

after(function() {
  nock.cleanAll();
});

describe("Files", () => {
  it("is able to get the users file list", () => {
    return pnut.fileList().should.become({});
  });

  it("is able to retrive a file object", () => {
    return pnut.file(69).should.become({});
  });

  it("is able to retrieve multiple file objects", () => {
    return pnut.files(69, 71).should.become({});
  });
});
