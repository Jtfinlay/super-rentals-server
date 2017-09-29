'use strict';

var rentalDao = require('../helpers/rentalDao.js');

module.exports = { getAll };

// Get /rental operationId
function getAll(req, res, next) {
    let querySpec = {
        query: 'SELECT * FROM root r'
    };

    return rentalDao.find(querySpec)
    .then( (results) => {
      res.json( results );  
    }).catch( (err) => {
      throw (err);  
    });
}