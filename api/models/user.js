const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const UserSchema = require('../database/schema/user');


UserSchema.pre('save', function(next) {
        if (!this.isModified('password')) {
            return next();
        }

        var that = this;
        this.generateSalt(function(err, salt) {
            if (err) {
                next(err);
            }
            that.salt = salt;
            that.encryptPassword(that.password, function(encryptErr, hashedPassword) {
                if (encryptErr) {
                    next(encryptErr);
                }
                that.password = hashedPassword;
                next();
            });
        });
    });


/**
 * Methods
 */
UserSchema.methods = {

    authenticate: function(password, callback) {
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }

        var that = this;
        this.encryptPassword(password, function(err, hashedPassword) {
            if (err) { return callback(err); }

            if (that.password === hashedPassword) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    },

    generateSalt: function(saltSize, callback) {
        var size = 12;

        if (typeof saltSize === 'function') {
            callback = saltSize;
        } else if (typeof callback === 'function') {
            callback = callback;
            size = saltSize;
        }

        if (!callback) {
            return crypto.randomBytes(size).toString('base64');
        }

        return crypto.randomBytes(size, function(err, salt) {
            if (err) {
                callback(err);
            } else {
                callback(null, salt.toString('base64'));
            }
        });
    },

    encryptPassword: function(password, callback) {
        if (!password || !this.salt) {
            return null;
        }

        var iterations = 1000;
        var key_length = 64;
        var salt = new Buffer(this.salt, 'base64');

        if (!callback) {
            return crypto.pbkdf2Sync(password, salt, iterations, key_length).toString('base64');
        }

        return crypto.pbkdf2(password, salt, iterations, key_length, function(err, key) {
            if (err) {
                callback(err);
            } else {
                callback(null, key.toString('base64'));
            }
        });
    }
};

module.exports = mongoose.model('User', UserSchema);