const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcrypt' );

const SALT_FACTOR = 10;

const authenticate = ( req, res, next ) => {
    const token = req.header( 'Authorization' );

    if( !token ) {
        return res.status( 401 ).json({
            message: 'Token is not sent'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, ( err, claims ) => {
        if( err ) {
            err.status = 401;
            return next( err );
        }

        res.locals.claims = claims;
        
        next();
    });
};

const authorize = role => {
    return ( req, res, next ) => {
        const claims = res.locals.claims;

        if( !claims.roles.includes( role ) ) {
            const error = new Error( 'You are not authorized' );
            error.status = 403;
            return next( error );
        }

        next();
    };
};

const encryptPassword = ( password, done ) => {
    bcrypt.genSalt( SALT_FACTOR, ( err, salt ) => {
        if( err ) {
            return done( err );
        }

        bcrypt.hash( password, salt, ( err, hashedPassword ) => {
            if( err ) {
                return done( err );
            }

            done( null, hashedPassword );
        });
    });
};

const checkPassword = ( password, encryptedPassword, done ) => {
    bcrypt.compare( password, encryptedPassword, ( err, isMatch ) => {
        done( err, isMatch );
    });
};

module.exports = {
    authenticate,
    authorize,
    encryptPassword,
    checkPassword
};