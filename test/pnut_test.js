const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const pnut = require('../lib/pnut');

describe('The pnut API wrapper', function () {

  it('should be able to send a custom request', function() {
    return pnut.custom('/custom/endpoint').should.become({})
  })

  it('should be able to fetch the the global timeline', function() {;
    return pnut.global().should.become({})
  });

  it('should be able to send a custom POST request', function() {
    return pnut.custom('/somewhere', 'POST', {text: 'sometext'})
  });

  it('should be able to send a custom PUT request', function() {
    return pnut.custom('/somewhere', 'PUT', {text: 'sometext'})
  });

  it('should be able to send a custom PATCH request', function() {
    return pnut.custom('/somewhere', 'PATCH', {text: 'sometext'});
  })

  /**
   * Authentication
   */
  describe('When requesting an authentication url, it', () => {
    it('should fail when no client id is given', () => {
      expect(() => pnut.authenticateClientURL('', 'http://github.com')).to.throw(Error)
    });

    it('should fail if no redirect uri is given', () => {
      expect(() => pnut.authenticateClientURL('sometoken', '')).to.throw(Error)
    });

    it('should give back a correct url where the client can authenticate', () => {
      let expectedURL = 'https://pnut.io/oauth/authenticate?client_id=mytoken&redirect_uri=http://github.com&scope=basic,stream,write_post,follow,update_profile,presence,messages,public_messages&response_type=token';

      expect(pnut.authenticateClientURL('mytoken', 'http://github.com')).to.equal(expectedURL);
    })
  })
});