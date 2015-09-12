var request = require('supertest');
var app = require('../../index');

describe('POST /', function () {
    it('respond 200 OK with "OK"', function (done) {
        request(app)
            .post('/')
            .send({ key: "value" })
            .set('Content-Type', 'application/json')
            .set('X-Hub-Signature', 'sha1=4c59989f52bed691d2c58ce5a9373256e7589a9c')
            .expect(200, 'OK', done);
    });

    context('`ping` event', function () {
        it ('respond 200 OK with "PONG"', function (done) {
            request(app)
                .post('/')
                .send({ key: "value" })
                .set('Content-Type', 'application/json')
                .set('X-Hub-Signature', 'sha1=4c59989f52bed691d2c58ce5a9373256e7589a9c')
                .set('X-Github-Event', 'ping')
                .expect(200, 'PONG', done);
        });
    });

    context('without HTTP Request heaaaer `X-Hub-Signature`', function() {
        it('respond 400 Bad Request', function(done) {
            request(app)
                .post('/')
                .set('Content-Type', 'application/json')
                .expect(400, 'Signature is required.', done);
        });
    });

    context('with incorrect signature', function() {
        it('respond 400 Bad Request', function(done) {
            request(app)
                .post('/')
                .send({ key: "value" })
                .set('Content-Type', 'application/json')
                .set('X-Hub-Signature', 'sha1=4')
                .expect(400, 'Signature did not match.', done);
        });
    });
});
