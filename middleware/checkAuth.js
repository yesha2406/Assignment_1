var jwt = require('jsonwebtoken');

var Response = require('../response');

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decode;
        next();
    } catch (error) {
        Response.errorResponse("Auth Failed...!!", res, error, 401)
    }
};