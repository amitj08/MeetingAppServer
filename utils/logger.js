const chalk = require( 'chalk' );

const log = ( ...args ) => console.log( ...args );
const logInfo = ( ...args ) => console.log( chalk.blue( ...args ) );
const logSuccess = ( ...args ) => console.log( chalk.green( ...args ) );
const logError = ( ...args ) => console.log( chalk.red( ...args ) );

module.exports = {
    log,
    logInfo,
    logSuccess,
    logError
};
