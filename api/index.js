const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const config = require('./config');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

var app = express();


app.set('x-powered-by', false);

app.use(compress({
    level: 9
}));

if (config.is_development) {
    app.use(logger('dev'));
} else {
    app.use(logger('short'));
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

if(config.hasOwnProperty('public_folders') && config.public_folders.length > 0)
{
    for(var i = 0, length = config.public_folders.length; i < length; i++)
    {
        app.use(express.static(path.join(__dirname, '../', config.public_folders[i])));
    }
}


//setup CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type');
    next();
});

//setup routes for our API
app.use('/', routes);


// Non-existing files or routes accessed handler (404)
app.use(function (req, res, next) {
    var err = new Error('File or route not found. Please go the frontpage and try again!');
    err.status = 404;
    next(err);
});

//last point in our middleware chain
//all unhandled routes will arrive here
app.use(function (err, req, res, next) {
    console.log(err.message);
    console.log(err.stack);
    var error = { error : err.message };
    if(config.is_development)
    {
        error.stack = err.stack;
    }

    res.status(err.status || 500).send(error);
});


module.exports = app;