var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var bufferEq = require('buffer-equal-constant-time');

app.set('GITHUB_WEBHOOK_SECRET', process.env.GITHUB_WEBHOOK_SECRET);

router.use(bodyParser.json({
    verify: function (req, res, buffer, encoding) {
        var err;

        if (!req.header('X-Hub-Signature')) {
            err = new Error('Signature is required.');
            err.status = 400;
            throw err;
        }

        // Generate HMAC signature
        var hmac = crypto.createHmac('sha1', app.get('GITHUB_WEBHOOK_SECRET'));
        hmac.setEncoding('hex');
        hmac.write(buffer);
        hmac.end();

        // Compare HMAC signature in constant time.
        if (!bufferEq(new Buffer('sha1=' + hmac.read()), new Buffer(req.header('X-Hub-Signature')))) {
            err = new Error('Signature did not match.');
            err.status = 400;
            throw err;
        }
    }
}));

router.use(function(err, req, res, next) {
    if (err.status) {
        res.status(err.status);
    }
    res.send(err.message);
});

router.post('/', function(req, res, next) {
    if (req.header('X-Github-Event') == 'ping') {
        res.send('PONG');
    } else {
        next();
    }
});

module.exports = router;
