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

    nock(base)
      .get('/users/1/avatar')
      .reply(200, {})

    nock(base)
      .get('/users/1/cover')
      .reply(200, {})

    nock(base)
      .get('/posts/1')
      .reply(200, {})

    nock(base)
      .get('/posts?ids=4,12,1000')
      .reply(200, {})

    nock(base)
      .get('/posts/1/revisions')
      .reply(200, {})

    nock(base)
      .get('/users/1/mentions')
      .reply(200, {})

    nock(base)
      .get('/users/1/posts')
      .reply(200, {})

    nock(base)
      .get('/posts/tag/pnut-butter')
      .reply(200, {})

    nock(base)
      .get('/posts/1/thread')
      .reply(200, {})

  });

  after(function() {
    nock.cleanAll();
  });

  it('should be able to fetch the the global timeline', function() {;
    return pnut.global().should.become({})
  });


  describe('User context', () => {
    it('should be able to fetch a user by id', () => {
      return pnut.user(1).should.become({});
    });

    it('should be able to fetch an array of users by their ids', () => {
      return pnut.users([4, 12, 1000]).should.become({});
    });

    it('should be able to fetch a users avatar', () => {
      // TODO: Test should be more specific about the return values
      expect(pnut.avatar(1)).to.be.fulfilled;
    });

    it('should be able to fetch a users cover', () => {
      expect(pnut.cover('1')).to.be.fulfilled
    })
  });


  describe('Post context', () => {
    it('should be able to fetch a post by id', () => {
      return pnut.post(1).should.become({});
    });

    it('should be able to fetch an array of posts by their ids', () => {
      return pnut.posts([4, 12, 1000]).should.become({});
    });

    it('should be able to fetch revisions of posts', () => {
      return pnut.revisions(1).should.become({});
    });

    it('should be able to fetch mentions for a specific user', () => {
      return pnut.mentions(1).should.become({});
    });

    it('should be able to fetch posts of a specific user', () => {
      return pnut.postsFrom(1).should.become({});
    });

    it('should be able to fetch posts by tags', () => {
      return pnut.postsTaggedWith('pnut-butter').should.become({});
    });

    it('should be able to fetch posts within a thread', () => {
      return pnut.thread('1').should.become({});
    })
  });
});