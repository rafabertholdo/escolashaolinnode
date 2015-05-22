/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/underscore/underscore.d.ts"/>

import http = require("http");
import express = require('express');
import path = require('path');
import db = require('./db'); 
import underscore = require('underscore');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'wwwroot')));

app.get('/', function (req, res) {
  var model = new db.Model();
  var response: string = "";
    model.getAllTestDocs(function (docs) {
        _.each(docs, (doc) => { response += ("key = [" + doc.key + "] value = [" + doc.value + "]"); });
        res.send(200, response);
    }, function (err) { res.send(err, 200); });
});

app.use(function (req,res) { //1
    res.render('404', {url:req.url}); //2
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});