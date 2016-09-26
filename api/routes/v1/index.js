const express = require('express');
const router = express.Router();
const users_endpoint = require('./users');


/* GET home page. */
router.all('/', function(req, res) {
    res.send( { message: "Hello from V1 API."});
});

//load the endpoints
router.use('/', users_endpoint);

module.exports = router;
