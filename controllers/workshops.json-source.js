const mongoose = require( 'mongoose' );
const workshops = require( '../data/workshops.json' );
const { getPage } = require( '../utils/array' );

const Workshop = mongoose.model( 'Workshop' );

let nextId = 13;

const getWorkshops = ( req, res, next ) => {
    let page = +req.query.page;
    let pageSize = +req.query.pageSize;

    if( isNaN( page ) ) {
        page = 1;
    }

    if( isNaN( pageSize ) ) {
        pageSize = 10;
    }

    res.status( 200 ).json({
        message: 'success',
        data: getPage( workshops, page, pageSize )
    });
};

const getWorkshopById = ( req, res, next ) => {
    let id = req.params.id;

    id = parseInt( id );
    if( isNaN( id ) ) {
        const error = new Error( 'Workshop id must be a number' );
        error.status = 400;
        return next( error );
    }

    const workshop = workshops.find( w => w.id === id );

    if( !workshop ) {
        const error = new Error( 'There is no workshop with the given id' );
        error.status = 404;
        return next( error );
    }

    res.status( 200 ).json({
        message: 'success',
        data: workshop
    });
};

const postWorkshop = ( req, res, next ) => {
    const workshop = req.body;

    // validations
    // check if the workshop details have been sent
    if( !workshop ) {
        const error = new Error( 'There is no workshop data' );
        error.status = 400;
        return next( error );
    }

    // check if the workshop has a name
    if( !workshop.name ) {
        const error = new Error( 'There is no name for the workshop' );
        error.status = 400;
        return next( error );
    }

    workshop.id = nextId++;
    workshops.push( workshop );

    res.status( 201 ).json({
        message: 'success',
        data: workshop
    });
};

module.exports = {
    getWorkshops,
    getWorkshopById,
    postWorkshop
};