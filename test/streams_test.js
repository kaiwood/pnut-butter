const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
chai.use(chaiAsPromised);
chai.should();

const pnut = require('../lib/pnut');

before(function () {
  let base = 'https://api.pnut.io/v0';

  nock(base)
    .get('/posts/streams/global')
    .reply(200, {});

  nock(base)
    .get('/posts/streams/me')
    .reply(200, {});
  
  nock(base)
    .get('/posts/streams/unified')
    .reply(200, {});
});

after(function () {
  nock.cleanAll();
})

describe('Stream endpoints', () => {

  it('should be able to fetch the the global timeline', function () {;
    return pnut.global().should.become({})
  });

  it('should be able to fetch the personal stream', () => {
    return pnut.personal().should.become({});
  });

  it('should be able to fetch a unified streams', () => {
    return pnut.unified().should.become({});
  });

});