const logger = require('../helpers/logger');
const mongoose = require('mongoose');
const config = require('../config');


var dbURI = 'mongodb://' + config.database.mongos.username + ':' + config.database.mongos.password + '@' + config.database.mongos.host + ':' + config.database.mongos.port + '/' + config.database.mongos.database_name;

mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to: ' + dbURI);
});
// If the connection throws an error 
mongoose.connection.on('error', function (err) {
    logger.info({ message: 'Mongoose default connection error', error_stack: err});
});
// When the connection is disconnected 
mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
});

//graceful process end
//close the mongodb conn
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.error('info', 'Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


process.on('uncaughtException', function (err) {
    logger.error({ message : 'Error initialazing endpoints', error_stack : err});
});