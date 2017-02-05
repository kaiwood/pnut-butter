const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const pnut = require('../lib/pnut');

describe('The pnut API wrapper', function () {

  before(function() {
    let root = 'https://api.pnut.io'
    nock(root)
      .get('/v0')
      .reply(200, {})

    nock(root)
      .get('/v0/posts/streams/global')
      .reply(200, {posts: 1})
  });

  after(function() {
    nock.cleanAll();
  });

  it('should get the global timeline', function() {;
    return pnut.global().should.become({'posts': 1})
  });
});