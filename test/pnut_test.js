const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const pnut = require('../lib/pnut');

before(function () {
  let base = 'https://api.pnut.io/v0';

  nock(base)
    .get('/somewhere')
    .reply(200, {});

  nock(base)
    .post('/somewhere')
    .reply(200, {});

  nock(base)
    .put('/somewhere')
    .reply(200, {});

  nock(base)
    .patch('/somewhere')
    .reply(200, {});

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

describe('The pnut-butter library', () => {
  it('should be able to send a custom GET request', () => {
    return pnut.custom('/somewhere').should.become({});
  });

  it('should be able to send a custom POST request', () => {
    return pnut.custom('/somewhere', 'POST', {
      text: 'sometext'
    });
  });

  it('should be able to send a custom PUT request', () => {
    return pnut.custom('/somewhere', 'PUT', {
      text: 'sometext'
    });
  });

  it('should be able to send a custom PATCH request', () => {
    return pnut.custom('/somewhere', 'PATCH', {
      text: 'sometext'
    });
  });
});

describe('Authentication', () => {
  it('should fail when no client id is given', () => {
    expect(() => pnut.authenticateClientURL('', 'http://github.com')).to.throw(Error);
  });

  it('should fail if no redirect uri is given', () => {
    expect(() => pnut.authenticateClientURL('sometoken', '')).to.throw(Error);
  });

  it('should give back a correct url where the client can authenticate', () => {
    let expectedURL = 'https://pnut.io/oauth/authenticate?client_id=mytoken&redirect_uri=http://github.com&scope=basic,stream,write_post,follow,update_profile,presence,messages,public_messages&response_type=token';

    expect(pnut.authenticateClientURL('mytoken', 'http://github.com')).to.equal(expectedURL);
  });
});

describe('System', () => {
  it('should be able to fetch sys/config', () => {
    return pnut.config().should.become({});
  });

  it('should be able to fetch sys/stats', () => {
    return pnut.stats().should.become({});
  });
});