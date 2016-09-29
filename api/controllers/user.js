"use strict";
const User = require('../models/user');

exports.add_user = function (data, callback) {
    if(data.hasOwnProperty('username') && data.hasOwnProperty('body'))
    {
        var user = new User(data.body);
        user.username = data.username;
        user.save(
            function(err, user)
            {
                if(err)
                    return callback(err, {}, {status : 422});

                callback(null, user, {status : 201});
            }
        );
    } else {
        return callback(new Error('Request data malformed or missing!'), {}, {status : 417});
    }
};

module.exports = exports;