var express = require('express');
var app = express();
var router = express.Router();

app.set('GITHUB_ACCESS_TOKEN', process.env.GITHUB_ACCESS_TOKEN);

app.get('/', function (req, res) {
    res.send('OK');
});

app.use('/', require('./middlewares/github-webhook-receiver'));
app.post('/', function(req, res) {
    res.send('OK');
});

// for test
module.exports = app;

if (!module.parent) {
    var server = app.listen(process.env.PORT || 3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });
}
