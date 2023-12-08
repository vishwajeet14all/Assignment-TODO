const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server error";

    //Cast error handling which occurs due to wrong id in path
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //handle duplicate email
    if (err.code === 11000) {
        const message = `Duplicate ${req.body.email} found`
        err = new ErrorHandler(message, 400)
    }

    //wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid Json web token`;
        err = new ErrorHandler(message, 400);
    }

    //jwt expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web token is expired`;
        err = new ErrorHandler(message, 400);
    }

    console.log('message', err.message, 'message')

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}