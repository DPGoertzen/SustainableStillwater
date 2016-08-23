var request = require('supertest');
var expect = require('chai').expect;
var User = require('../models/User.js');

describe('testing server login', function() {
  var server;

  beforeEach(function () {
    server = require('../server.js');
  });
  afterEach(function () {
    server.close();
  });

  it('should show the user the log in page at the root url', function(done) {
    request(server)
    .get('/')
    .expect(200, done);
  });

  describe('login tests', function() {
    before('remove all users', function(done) {
      User.remove({}, function(err){
        done();
      });
    });

    before('create a user', function(done){
      request(server)
        .post('/register')
        .send({username: 'claire', password: 'password1'})
        .expect(302)
        .expect('Location', '/', done);
    });

    it('should log a user in with the correct credentials', function(done){
      request(server)
      .post('/login')
      .send({username: 'claire', password: 'password1'})
      .expect(302)
      .expect('Location', '/login/passportSuccess', done);
    });

    it('should not log an unknown user in', function(done){
      request(server)
        .post('/login')
        .send({username: 'stranger', password: 'notevenreal'})
        .expect(302)
        .expect('Location', '/login/passportFailure', done);
    })
  })
})
