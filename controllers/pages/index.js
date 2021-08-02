const workshops = require( '../../data/workshops.json' );

const links = [
    { title: 'Home', href: '/' },
    { title: 'Workshops List', href: '/workshops-list' }
];

const sendHome = ( req, res ) => {
    res.render( 'index', {
        links,
        current: '/',
        pageTitle: 'Home'
    });
};

const sendWorkshopsList = ( req, res ) => {
    res.render( 'workshops-list', {
        links,
        current: '/workshops-list',
        pageTitle: 'Workshops List',
        workshops, // workshops: workshops
        formatDate( isoDate ) { // we can pass methods as part of the object
            const date = new Date( isoDate );
            return date.toString().substr( 0, 10 );
        }
    });
};

module.exports = {
    sendHome,
    sendWorkshopsList
};