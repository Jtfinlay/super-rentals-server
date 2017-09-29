// https://docs.microsoft.com/en-us/azure/cosmos-db/documentdb-nodejs-application

var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docdbUtils');
var azureConfig = require('./azureConfig');

var docDbClient = new DocumentDBClient(azureConfig.host, {
    masterKey: azureConfig.authKey
});

var RentalDao = {
    client: docDbClient,
    databaseId: azureConfig.databaseId,
    collectionId: azureConfig.collectionId,
    
    database: null,
    collection: null,

    init: function () {
        var self = this;

        return new Promise((resolve, reject) => {
            docdbUtils.getDatabase(self.client, self.databaseId, function (err, db) {
                if (err) {
                    reject(err);
                    return;
                }
                self.database = db;
                docdbUtils.getCollection(self.client, self.database._self, self.collectionId, function(err, coll) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    self.collection = coll;
                    resolve();
                })
            });
        });
    },

    find: function (querySpec) {
        var self = this;

        return new Promise((resolve, reject) => {
            self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
                if (err) {
                    reject(err);
                    return;
                }
                results.forEach(function(rental, index) {
                    delete rental._rid;
                    delete rental._self;
                    delete rental._etag;
                    delete rental._attachments;
                    delete rental._ts;
                });
                resolve({data: results});
            })
        });
    },

    getItem: function (itemId) {
        var self = this;

        return new Promise((resolve, reject) => {
            var querySpec = {
                query: 'SELECT * FROM root r WHERE r.id = @id',
                parameters: [{
                    name: '@id',
                    value: itemId
                }]
            };
            self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({data: results[0]});
            });
        });
    }
};

module.exports = RentalDao;