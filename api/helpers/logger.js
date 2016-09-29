"use strict";
var winston = require('winston');

//winston.add(winston.transports.File, { filename: 'somefile.log' });
//winston.remove(winston.transports.Console);

module.exports = {

    error : function(error) {
        winston.error(error);
    },

    warn: function(warning) {
        winston.warn(warning);
    },

    info: function(info)
    {
        winston.info(info);
    }

};