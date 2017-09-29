'use strict';

var rentalDao = require('../helpers/rentalDao.js');

module.exports = { getAll };

// Get /rental operationId
function getAll(req, res, next) {
  let querySpec = null;
  let city = req.query.city;

  if (city) {
    querySpec = {
      query: 'SELECT * FROM root r WHERE STARTSWITH(LOWER(r.attributes.city), LOWER(@city))',
      parameters: [{
        name: '@city',
        value: city
      }]
    };
  } else {
    querySpec = {
      query: 'SELECT * FROM root r'
    };
  }

  return rentalDao.find(querySpec)
  .then( (results) => {
    res.json( results );  
  }).catch( (err) => {
    throw (err);  
  });
}