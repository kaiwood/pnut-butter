const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
chai.use(chaiAsPromised);
chai.should();

const pnut = require('../lib/pnut');

before(function () {
  let base = 'https://api.pnut.io/v0';

  nock(base)
    .get('/channels/1')
    .reply(200, {});

  nock(base)
    .get('/channels?ids=1,2,3')
    .reply(200, {});

  nock(base)
    .get('/users/me/channels')
    .reply(200, {});

  nock(base)
    .get('/users/me/channels/existing_pm?ids=1,2')
    .reply(200, {});

  nock(base)
    .get('/users/me/channels/num_unread/pm')
    .reply(200, {});

  nock(base)
    .delete('/users/me/channels/num_unread/pm')
    .reply(200, {});
});

after(function () {
  nock.cleanAll();
});

describe('Channels', () => {
  it('should be able to fetch a single channel', () => {
    return pnut.channel(1).should.become({});
  });

  it('should be able to fetch multiple channels', () => {
    return pnut.channels(1, 2, 3).should.become({});
  });

  it('should be able to fetch channels created by the authenticated user', () => {
    return pnut.usersChannels().should.become({});
  });

  it('should be able to retrieve a private message channel for a set of users', () => {
    return pnut.pmChannelFor(1, 2).should.become({});
  });

  it('should be able to retrive to number of unread private messages', () => {
    return pnut.unread().should.become({});
  });

  it('should be able to mark all private messages as read', () => {
    return pnut.markAsRead().should.become({});
  });
});