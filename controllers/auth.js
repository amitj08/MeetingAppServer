const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );
const jwt = require( 'jsonwebtoken' );

const register = async ( req, res, next ) => {
    const user = req.body;

    if( !user ) {
        const error = new Error( 'You have sent your data' );
        error.status = 400;
        return next( error );
    }

    try {
        const updatedUser = await User.create( user );

        const userDetailsToSend = updatedUser.toObject();
        delete userDetailsToSend.password;

        res.status( 201 ).json({
            message: 'success',
            data: userDetailsToSend
        });
    } catch( error ) {
        return next( error );
    }
};

const login = async ( req, res, next ) => {
    const credentials = req.body;
    const { email, password } = credentials;

    if( !credentials ) {
        const error = new Error( 'There is no credentials sent' );
        error.status = 400;
        return next( error );
    }

    try {
        const matchedUser = await User.findOne( { email } );

        // check match of password
        matchedUser.checkPassword( password, ( err, isMatch ) => {
            if( err || !isMatch ) {
                const error = err || new Error( 'credentials do not match' );
                error.status = 401;
                return next( error );
            }

            const claims = {
                roles: matchedUser.roles,
                _id: matchedUser._id,
                email: matchedUser.email
            };

            jwt.sign( claims, process.env.JWT_SECRET, { expiresIn: '24h' }, ( err, token ) => {
                if( err ) {
                    err.status = 500;
                    return next( err );
                }

                res.status( 200 ).json({
                    message: 'success',
                    data: {
                        token,
                        name: matchedUser.name,
                        email: matchedUser.email
                    }
                });
            });
        });
    } catch( error ) {
        return next( error );
    }
};

module.exports = {
    register,
    login
};