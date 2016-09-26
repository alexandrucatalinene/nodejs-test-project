const express = require('express');
const path = require('path');
const config = require('../config');
const logger = require('../helpers/logger');
const template = require('../helpers/template_resolver');

var router = express.Router();

if(config.hasOwnProperty('api') && config.api != null && config.api.endpoints.length > 0)
{
    for(var i = 0, length = config.api.endpoints.length; i < length; i++)
    {
        var api = config.api.endpoints[i];
        if(!api.enabled)
            continue;

        try{
            var exec = require(path.join(__dirname, api.internal_path));
            router.use(api.web_access_point, exec);
        } catch(err){
            if(err.code === 'MODULE_NOT_FOUND') {
                logger.error('API : ' + api.web_access_point + ' could not be loaded!');
            }
        }

    }
}

//all other requests should go to the frontpage
router.all('/', function (req, res) {
    res.sendFile(template('index'));
});

//export the router to be used by express
module.exports = router;