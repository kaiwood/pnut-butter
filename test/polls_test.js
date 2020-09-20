const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");

chai.use(chaiAsPromised);
chai.should();

const pnut = require("../dist/index");

before(() => {
  let base = "https://api.pnut.io/v0";

  nock(base)
    .post("/polls", {
      type: "com.example.site",
      prompt: "Do you like Pnut?",
      options: [
        {
          text: "Yes"
        },
        {
          text: "Of course"
        }
      ],
      duration: "60",
      is_anonymous: "false"
    })
    .reply(200, {});

  nock(base)
    .put("/polls/1/response/2")
    .reply(200, {});

  nock(base)
    .delete("/polls/72")
    .reply(200, {});

  nock(base)
    .get("/polls/1")
    .reply(200, {});

  nock(base)
    .get("/users/me/polls")
    .reply(200, {});
});

after(() => {
  nock.cleanAll();
});

describe("Polls", () => {
  it("should be able to create a new poll", () => {
    return pnut
      .createPoll({
        type: "com.example.site",
        prompt: "Do you like Pnut?",
        options: [
          {
            text: "Yes"
          },
          {
            text: "Of course"
          }
        ],
        duration: "60",
        is_anonymous: "false"
      })
      .should.become({});
  });

  it("should be able to respond to a poll", () => {
    return pnut.respondToPoll(1, 2).should.become({});
  });

  it("should be able to delete a poll", () => {
    return pnut.deletePoll(72).should.become({});
  });

  it("should be able to retrieve a poll object", () => {
    return pnut.poll(1).should.become({});
  });

  it("should be able to list the users polls", () => {
    return pnut.myPolls().should.become({});
  });
});
