// load environment variables
require( 'dotenv' ).config();

// connect to the DB
require( './data/init' );

const express = require( 'express' );
const cors = require('cors');
const path = require( 'path' );
// we destructure the returned exports object to extract only functions we want
const { logSuccess, logError } = require( './utils/logger' );
const { pageNotFoundHandler, errorHandler } = require( './middleware/error' );
const { logger } = require( './middleware/logger' );

//const pagesRouter = require( './routes/pages' );
const authRouter = require( './routes/auth' );
const calendarRouter= require( './routes/calendar');
const usersRouter = require( './routes/users');
const meetingsRouter = require( './routes/meetings' );
const teamsRouter = require( './routes/teams' );

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use( cors() );
}
app.use( logger );

// multiple static server middleware can be set if needed
app.use( express.static( path.join( process.cwd(), 'public' ) ) );
// app.use( express.static( path.join( process.cwd(), 'images' ) ) );

app.use( express.urlencoded( { extended: false } ) );   //reading data from form data in url like &id=9 etc
app.use( express.json() );

//app.use( '/', pagesRouter );
app.use( '/api/auth', authRouter );
app.use( '/api/users', usersRouter );
app.use( '/api/calendar', calendarRouter );
app.use( '/api/meetings', meetingsRouter );
app.use( '/api/teams', teamsRouter );
app.use( pageNotFoundHandler );
app.use( errorHandler );

const PORT = process.env.PORT || 3000;

app
    .listen( PORT )
    .on( 'error', error => {
        logError( error.message );
    })
    .on( 'listening', () => {
        logSuccess( `server running on http://localhost:${PORT}` );
    });
    