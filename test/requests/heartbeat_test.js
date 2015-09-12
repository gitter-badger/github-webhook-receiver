var request = require('supertest');
var app = require('../../index');

describe('GET /', function () {
    it('respond 200 OK with "OK"', function (done) {
        request(app)
            .get('/')
            .expect(200, 'OK', done);
    });
});
