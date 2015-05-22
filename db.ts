/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/mongodb/mongodb.d.ts"/>

import mongodb = require('mongodb');

interface TestDoc {
    key: string;
    value: string;
}


export class Model {
    private server: mongodb.Server;
    private client: mongodb.Db;

    constructor() {
        var dbname: string = process.env['MONGO_NODE_DRIVER_DBNAME'] || 'escolashaolin';
        var host: string = process.env['MONGO_NODE_DRIVER_HOST'] || 'ds034208.mongolab.com';
        var port: number = parseInt(process.env['MONGO_NODE_DRIVER_PORT']) || 34208;

        this.server = new mongodb.Server(host, port, { auto_reconnect: true });

        this.client = new mongodb.Db(dbname, this.server, { safe: true });
        this.client.open((error) => {
            if (error) { console.error(error); return; }

            var username: string = process.env['MONGO_NODE_DRIVER_USER'] || 'sa';
            var password: string = process.env['MONGO_NODE_DRIVER_PASSWORD'] || 'P@ssw0rd';

            if (username && password) {
                this.client.authenticate(username, password, function(error) {
                    if (error) { console.error(error); return; }
                });
            }
        });
    }

    putTestDoc(doc: TestDoc, callback: (doc: TestDoc) => void, errorcb: (error: any) => void): void {
        this.client.collection('TestDoc', function(error, docs) {
            if (error) { console.error(error); errorcb(error); return }

            docs.insert(doc, function(error, object) {
                if (error) { console.error(error); errorcb(error); return; }
                callback(object)
            });
        });
    }

    getTestDoc(key: string, callback: (doc: TestDoc) => void, errorcb: (error: any) => void): void {
        this.client.collection('TestDoc', function(error, docs) {
            if (error) { console.error(error); errorcb(error); return; }

            docs.findOne({ 'key': key }, function(error, doc) {
                if (error) { console.error(error); errorcb(error); return; }
                callback(doc);
            });
        });
    }

    getAllTestDocs(callback: (docs: TestDoc[]) => void, errorcb: (error: any) => void): void {
        this.client.collection('TestDoc', function(error, docs) {
            if (error) { console.error(error); errorcb(error); return; }

            docs.find({}, { limit: 100 }).toArray(function(err, docs) {
                if (error) { console.error(error); errorcb(error); return; }
                callback(docs);
            });
        });
    }
} 