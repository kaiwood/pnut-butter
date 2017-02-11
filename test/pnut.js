const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const pnut = require('../lib/pnut');

describe('The pnut API wrapper', function () {

  before(function() {
    let base = 'https://api.pnut.io/v0';

    nock(base)
      .get('/posts/streams/global')
      .reply(200, {})

    nock(base)
      .get('/users/1')
      .reply(200, {})

    nock(base)
      .get('/users?ids=4,12,1000')
      .reply(200, {})

  });

  after(function() {
    nock.cleanAll();
  });

  it('should get the global timeline', function() {;
    return pnut.global().should.become({})
  });

  it('should be able to fetch a user by id', () => {
    return pnut.user(1).should.become({});
  });

  it('should be able to fetch an array of users by their ids', () => {
    return pnut.users([4, 12, 1000]).should.become({});
  })
});