const mongoose = require( 'mongoose' );
// creating custom Error classes
// class NotFoundError extends Error {

// }

const pageNotFoundHandler = ( req, res, next ) => {
    const error = new Error( 'Not found' );
    error.status = 404;
    return next( error );
};

const errorHandler = ( error, req, res, next ) => {
    if( !error.status ) {
        // check the error object and properties within to determine the kind of error
        // NOTE: unique validation check error will not be an instance of mongoose.Error.ValidationError - we need to handle this somehow (how?)
        if( error instanceof mongoose.Error.ValidationError ) {
            error.status = 400;
        } else {
            error.status = 500;
        }
    } else {
        error.status = 500;
    }

    return res.status( error.status ).json({
        message: 'error',
        description: error.message,
        data: null
    });
};

module.exports = {
    pageNotFoundHandler,
    errorHandler
};