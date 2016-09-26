const express = require('express');
const router = express.Router();
const auth_m = require('../../middlewares/authorization');

/* Create user. */
router.post('/users/:user_id', function(req, res, next) {
    res.send('User created!');
});

router.patch('/users/:user_id', auth_m.authorize, function(req, res, next) {
    res.send('User successfully modified!');
});

router.delete('/users/:user_id', auth_m.authorize, function(req, res, next) {
    res.send('User deleted!');
});

module.exports = router;