module.exports = {
    errorResponse: function (err, res, status) {
        res.status(err.status || status);
        res.end(JSON.stringify({
            flag: 0,
            message: err.message,
            error: err
        }));
    },

    successResponse: function (message, res, data, status, token) {
        res.status(status);
        res.end(JSON.stringify({
            flag: 1,
            message: message,
            data: data,
            token: token
        }));
    }

}