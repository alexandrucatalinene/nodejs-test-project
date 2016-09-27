var mongoose = require('mongoose');


var reportSchema = mongoose.Schema({
    _user_ref: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    time: {
        type: Number,
        min: 0,
        max: 2,
        'default': 0
    },
    date: {
        type: Date,
        'default': new Date()
    },
    description: {
        type: String,
        trim: true,
        'default': null
    },
    modified: {
        type: mongoose.Schema.Types.ObjectId,
        'default': new mongoose.Types.ObjectId()
    }
}, {
    collection: 'reports',
    autoIndex: false
});


reportSchema.index({
    _user_ref: 1
}, {
    name: "reports_select_index"
});


module.exports = reportSchema;