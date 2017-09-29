// https://docs.microsoft.com/en-us/azure/cosmos-db/documentdb-nodejs-application

var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docdbUtils');
var azureConfig = require('./azureConfig');

var docDbClient = new DocumentDBClient(azureConfig.host, {
    masterKey: azureConfig.authKey
});

function RentalDao(documentDBClient, databaseId, collectionId) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;

    this.database = null;
    this.collection = null;
}

var RentalDao = {
    client: docDbClient,
    databaseId: azureConfig.databaseId,
    collectionId: azureConfig.collectionId,
    
    database: null,
    collection: null,

    init: function (callback) {
        var self = this;

        docdbUtils.getDatabase(self.client, self.databaseId, function(err, db) {
            if (err) {
                callback(err);
            } else {
                self.database = db;
                docdbUtils.getCollection(self.client, self.database._self, self.collectionId, function(err, coll) {
                    if (err) {
                        callback(err);
                    } else {
                        self.collection = coll;
                    }
                });
            }
        });
    },

    find: function (querySpec, callback) {
        var self = this;

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },

    getItem: function (itemId, callback) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results[0]);
            }
        });
    }
};

module.exports = RentalDao;