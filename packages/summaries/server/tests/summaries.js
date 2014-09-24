'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Summary = mongoose.model('Summary');

/**
 * Globals
 */
var user;
var summary;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Summary:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        summary = new Summary({
          title: 'Summary Title',
          content: 'Summary Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return summary.save(function(err) {
          should.not.exist(err);
          summary.title.should.equal('Summary Title');
          summary.content.should.equal('Summary Content');
          summary.user.should.not.have.length(0);
          summary.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        summary.title = '';

        return summary.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        summary.content = '';

        return summary.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        summary.user = {};

        return summary.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      summary.remove();
      user.remove();
      done();
    });
  });
});
