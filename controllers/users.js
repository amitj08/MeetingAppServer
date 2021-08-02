const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );

const getUsers = async ( req, res, next ) => {
    let page = +req.query.page;
    let pageSize = +req.query.pageSize;

    if( isNaN( page ) ) {
        page = 1;
    }

    if( isNaN( pageSize ) ) {
        pageSize = 10;
    }

    try {
        const users = await User
            .find()
            .select( { name: true, email: true } )
            .skip( ( page - 1 ) * pageSize )
            .limit( pageSize );
    
        res.status( 200 ).json({
            message: 'success',
            data: users
        });
    } catch( error ) {
        return next( error );
    }
};


module.exports = {
    getUsers
};