

var authorize = function(req, res, next)
{
    //skip all authorization for now
    next();
};

module.exports = {
    authorize : authorize
};