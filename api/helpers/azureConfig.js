//https://docs.microsoft.com/en-us/azure/cosmos-db/documentdb-nodejs-application
'use strict';

var azureConfig = {}

 azureConfig.host = process.env.HOST || "[the URI value from the Azure Cosmos DB Keys blade on http://portal.azure.com]";
 azureConfig.authKey = process.env.AUTH_KEY || "[the PRIMARY KEY value from the Azure Cosmos DB Keys blade on http://portal.azure.com]";
 azureConfig.databaseId = "ToDoList";
 azureConfig.collectionId = "Items";

 module.exports = azureConfig;