/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/mongodb/mongodb.d.ts"/>
var mongodb = require('mongodb');
var Model = (function () {
    function Model() {
        var _this = this;
        var dbname = process.env['MONGO_NODE_DRIVER_DBNAME'] || 'escolashaolin';
        var host = process.env['MONGO_NODE_DRIVER_HOST'] || 'ds034208.mongolab.com';
        var port = parseInt(process.env['MONGO_NODE_DRIVER_PORT']) || 34208;
        this.server = new mongodb.Server(host, port, { auto_reconnect: true });
        this.client = new mongodb.Db(dbname, this.server, { safe: true });
        this.client.open(function (error) {
            if (error) {
                console.error(error);
                return;
            }
            var username = process.env['MONGO_NODE_DRIVER_USER'] || 'sa';
            var password = process.env['MONGO_NODE_DRIVER_PASSWORD'] || 'P@ssw0rd';
            if (username && password) {
                _this.client.authenticate(username, password, function (error) {
                    if (error) {
                        console.error(error);
                        return;
                    }
                });
            }
        });
    }
    Model.prototype.putTestDoc = function (doc, callback, errorcb) {
        this.client.collection('TestDoc', function (error, docs) {
            if (error) {
                console.error(error);
                errorcb(error);
                return;
            }
            docs.insert(doc, function (error, object) {
                if (error) {
                    console.error(error);
                    errorcb(error);
                    return;
                }
                callback(object);
            });
        });
    };
    Model.prototype.getTestDoc = function (key, callback, errorcb) {
        this.client.collection('TestDoc', function (error, docs) {
            if (error) {
                console.error(error);
                errorcb(error);
                return;
            }
            docs.findOne({ 'key': key }, function (error, doc) {
                if (error) {
                    console.error(error);
                    errorcb(error);
                    return;
                }
                callback(doc);
            });
        });
    };
    Model.prototype.getAllTestDocs = function (callback, errorcb) {
        this.client.collection('TestDoc', function (error, docs) {
            if (error) {
                console.error(error);
                errorcb(error);
                return;
            }
            docs.find({}, { limit: 100 }).toArray(function (err, docs) {
                if (error) {
                    console.error(error);
                    errorcb(error);
                    return;
                }
                callback(docs);
            });
        });
    };
    return Model;
})();
exports.Model = Model;
//# sourceMappingURL=db.js.map