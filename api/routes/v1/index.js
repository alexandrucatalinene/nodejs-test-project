var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
  res.send( { message: "Hello from V1 API."});
});

module.exports = router;
