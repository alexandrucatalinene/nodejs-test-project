const logger = require('../helpers/logger');
const mongoose = require('mongoose');
const config = require('../config');


var mongos_connectionstring = 'mongodb://' + config.database.mongos.host + ':' + config.database.mongos.port + '/' + config.database.mongos.database_name;

var options = {
    db: { native_parser: true },
    server: {
        poolSize: 5,
        ssl : true,
        socketOptions : {
            keepAlive : 120
        }
    },
    user: config.database.mongos.username,
    pass: config.database.mongos.password
};

mongoose.connect(mongos_connectionstring, options);


mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to: ' + mongos_connectionstring);
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
        logger.error('Closing mongodb connection on close signal received!');
        process.exit(0);
    });
});