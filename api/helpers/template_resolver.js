"use strict";
var path = require('path');
var config = require('../config');

module.exports = function(template_name)
{
    return path.join(__dirname, '../../', config.template.folder, template_name + config.template.extension);
};