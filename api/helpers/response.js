var send = function (err, data, options, res, next) {
    if(err)
    {
        next(err);
    } else {
        res.status(options.status || 200)
            .send({
                err : err,
                data: data || {}
            });
    }
};


var redirect = function (err, status, location, res, next) {
    if (err) {
        err.status = status;
        next(err);
    } else {
        res.writeHead(301, {
            'Location': location
        });
        res.end();
    }
};

module.exports = {
    send: send,
    redirect: redirect
};