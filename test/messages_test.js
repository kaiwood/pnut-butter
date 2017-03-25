const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
chai.use(chaiAsPromised);
chai.should();

const pnut = require('../lib/pnut');

before(function () {
  let base = 'https://api.pnut.io/v0';

  nock(base)
    .get('/somewhere')
    .reply(200, {});
});

after(function () {
  nock.cleanAll();
});

describe('Messages', () => {
  it('should be able to retrieve a message from a channels (pnut.message)');
  it('should be able to retrieve a thread of messages (pnut.channelThread)');
  it('should be able to find specified message (pnut.findMessages)');
  it('should be able to retrieve messages from a channel (pnut.messages)');
  it('should be able to retrieve a list of the authenticated users messages (pnut.usersMessages)');

  it('should be able to send a message (pnut.createMessage)');
  it('should be able to delete a message (pnut.deleteMessage)');

  it('should be able to retrieve a list of sticky messages (pnut.stickies)');
  it('should be able to create a sticky (pnut.sticky)');
  it('should be able to delete a sticky (pnut.unsticky)');
});