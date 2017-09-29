'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

var RentalDao = require('./api/helpers/rentalDao.js');

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // setup database access object
  RentalDao.init().then(function() {
    
    // install middleware
    swaggerExpress.register(app);
  
    var port = process.env.PORT || 10010;
    app.listen(port);

  }).catch( (err) => {
    console.log(err);
  });
});
