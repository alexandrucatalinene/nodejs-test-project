"use strict";
var winston = require('winston');

//winston.add(winston.transports.File, { filename: 'somefile.log' });
//winston.remove(winston.transports.Console);

module.exports = {

    error : function(error) {
        winston.error('ERROR: ', error);
    },

    warn: function(warning) {
        winston.warn('WARNING: ', warning);
    },

    info: function(info)
    {
        winston.info('INFO: ', info);
    }

};