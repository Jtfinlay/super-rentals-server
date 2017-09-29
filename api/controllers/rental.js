'use strict';

var rentalDao = require('../helpers/RentalDao');

module.exports = { getAll };

// Get /rental operationId
function getAll(req, res, next) {
    let querySpec = {
        query: 'SELECT * FROM root r'
    };

    rentalDao.find(querySpec, function(err, items) {
        if (err) {
            throw (err);
        }

        res.json( items );
    });
}