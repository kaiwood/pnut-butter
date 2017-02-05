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
      .reply(200, {interceptor: 'nock'})

    nock(root)
      .get('/v0/posts/streams/global')
      .reply(200, {posts: 1})
  });

  after(function() {
    nock.cleanAll();
  });

  it('should be able to talk to the api root', function () {
    let result = {interceptor: 'nock'}
    return pnut.root().should.become(result);
  });

  it('should get the global timeline', function() {;
    return pnut.global().should.become({'posts': 1})
  })
});