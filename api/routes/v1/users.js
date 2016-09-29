const express = require('express');
const router = express.Router();
const auth_m = require('../../middlewares/authorization');
const user_ctrl = require('../../controllers/user');
const response_helper = require('../../helpers/response');

/* Create user. */
router.post('/users/:user_id', function(req, res, next) {
    user_ctrl.add_user({username : req.params.user_id, body: req.body},
        function(err, res_data, options)
        {
            response_helper.send(err, res_data, options, res, next);
        }
    );
});

router.patch('/users/:user_id', auth_m.authorize, function(req, res, next) {
    res.send('User successfully modified!');
});

router.delete('/users/:user_id', auth_m.authorize, function(req, res, next) {
    res.send('User deleted!');
});

module.exports = router;