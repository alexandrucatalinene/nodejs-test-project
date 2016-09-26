"use strict";
const path = require('path');

var config = function()
{
    var config_obj = {};
    var environment_path = path.join(__dirname, './environment/production');
    config_obj.is_development = false;
    if(
        (process.env.hasOwnProperty('ENVIRONMENT') && process.env.ENVIRONMENT == 'development')
        || (process.env.NODE_ENV && process.env.NODE_ENV == 'development')
    )
    {
        environment_path = path.join(__dirname, './environment/development');
        config_obj.is_development = true;
    }

    config_obj['template'] = require(path.join(environment_path, 'template.json'));
    config_obj['api'] = require(path.join(environment_path, 'apis.json'));
    config_obj['database']  = require(path.join(environment_path, 'database.json'));

    return config_obj;
}();

module.exports = config;