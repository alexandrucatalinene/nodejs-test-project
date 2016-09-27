const express = require('express');
const router = express.Router();
const auth_m = require('../../middlewares/authorization');
const user_ctrl = require('../../controlers/user');

/* Create user. */
router.post('/users/:user_id', function(req, res, next) {
    user_ctrl.add_user({user_id : req.params.user_id, body: req.body},
        function(err, resp_data)
        {
            if(err)
            {
                next(err)
            }
        }
    );
    res.send('User created!');
});

router.patch('/users/:user_id', auth_m.authorize, function(req, res, next) {
    res.send('User successfully modified!');
});

router.delete('/users/:user_id', auth_m.authorize, function(req, res, next) {
    res.send('User deleted!');
});

module.exports = router;