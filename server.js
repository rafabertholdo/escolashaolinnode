/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
var http_1 = require("http");
var express = require('express');
var path = require('path');
var db = require('./db');
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'wwwroot')));
app.get('/', function (req, res) {
    var model = new db.Model();
    var response = "";
    model.getAllTestDocs(function (docs) {
        _.each(docs, function (doc) { response += ("key = [" + doc.key + "] value = [" + doc.value + "]"); });
        res.send(response, 200);
    }, function (err) { res.send(err, 200); });
});
app.use(function (req, res) {
    res.render('404', { url: req.url }); //2
});
http_1.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=server.js.map