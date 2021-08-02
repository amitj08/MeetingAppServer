const express = require( 'express' );
const { authenticate } = require( '../utils/auth' );
const { getUsers } = require( '../controllers/users' );

const router = express.Router();

router.get( '/', authenticate, getUsers );

module.exports = router;