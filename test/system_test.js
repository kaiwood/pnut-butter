const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
chai.use(chaiAsPromised);
chai.should();

const pnut = require('../lib/pnut');

before(function () {
  let base = 'https://api.pnut.io/v0';

  nock(base)
    .get('/sys/config')
    .reply(200, {});

  nock(base)
    .get('/sys/stats')
    .reply(200, {});
});

after(function () {
  nock.cleanAll();
});

describe('System', () => {
  it('should be able to fetch sys/config', () => {
    return pnut.config().should.become({});
  });

  it('should be able to fetch sys/stats', () => {
    return pnut.stats().should.become({});
  });
});