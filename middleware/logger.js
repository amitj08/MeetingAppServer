// middleware stack (the functions are executed in the order they are passed to app.use())
const logger =( req, res, next ) => {
    console.log( 'New request : ', req.url );
    next(); // important - DO NOT FORGET
    console.log( 'Response sent for request : ', req.url );
};

module.exports = {
    logger
};