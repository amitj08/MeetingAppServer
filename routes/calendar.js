const express = require( 'express' );
const { authenticate, authorize } = require( '../utils/auth' );
const { getMeetingsByDate } = require( '../controllers/meetings' );

const router = express.Router();

router.get( '/', authenticate, getMeetingsByDate );

module.exports = router;