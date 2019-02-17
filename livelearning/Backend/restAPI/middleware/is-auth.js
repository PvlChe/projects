const jwt = require('jsonwebtoken');
const constants = require('../constants');

module.exports = (req, res, next) => {
    if(!req.get('Authorization')) {
        const error = new Error('Not Authenticated! Missing Token');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, constants.SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('Not Authenticated! Wrong Token');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    req.status = decodedToken.status;
    next();
};