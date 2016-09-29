const mongoose = require('mongoose');
const crypto = require('crypto');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        validate: /^[a-zA-Z][a-zA-Z0-9\._\-]{3,14}?[a-zA-Z0-9]{0,2}$/
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        validate: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    },
    name: {
        type: String,
        trim: true,
        'default': null
    },
    salt: {
        type: String,
        required: true,
        'default': function() { return crypto.randomBytes(12).toString('base64'); }
    },
    modified : {
        type: mongoose.Schema.Types.ObjectId,
        'default': new mongoose.Types.ObjectId()
    }
}, {
    collection: 'users',
    autoIndex: false
});


userSchema.index({
    username: 1
}, {
    unique: true
}, {
    name: "users_username_unique_index"
});


userSchema.index({
    email: 1
}, {
    unique: true
}, {
    name: "users_email_unique_index"
});


userSchema.index({
    username: 1,
    email: 1,
    name: 1
}, {
    name: "users_composed_index"
});


module.exports = userSchema;