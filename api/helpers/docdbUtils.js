// https://docs.microsoft.com/en-us/azure/cosmos-db/documentdb-nodejs-application

var DocumentDBClient = require('documentdb').DocumentClient;

var DocDBUtils = {
    getDatabase: function (client, databaseId, callback) {
        let querySpec = {
            query: 'Select * FROM root r WHERE r.id= @id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };
        client.queryDatabases(querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                if (results.length === 0) {
                    callback(null) //todo: pass err
                } else {
                    callback(null, results[0]);
                }
            }
        })
    },

    getCollection: function (client, databaseLink, collectionId, callback) {
        var querySpec = {
            query: 'Select * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };

        client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                if (results.length === 0) {
                    callback(null); //todo: pass err
                } else {
                    callback(null, results[0]);
                }
            }
        });
    }
}

module.exports = DocDBUtils;