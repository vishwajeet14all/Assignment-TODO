const jwt = require('jsonwebtoken')
const { db } = require('../database')
const ErrorHandler = require('../utils/errorHandler')


const authenticatedUser = async (req, res, next) => {
    const { authToken } = req.cookies;
    const token = authToken;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const { email } = await jwt.verify(token, process.env.SECRET_KEY);
    const query = 'SELECT * FROM `users` WHERE `email` = ?';

    db.query(query, [email], (err, results) => {
        if (err) {
            return next(new ErrorHandler(err.message, err.code))
        }

        req.user = results;
    });
    next();
}

module.exports = authenticatedUser;