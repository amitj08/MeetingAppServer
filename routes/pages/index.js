const express = require( 'express' );
const { sendHome, sendWorkshopsList } = require( '../../controllers/pages' );

const router = express.Router();

router.get( '/', sendHome );
router.get( '/workshops-list', sendWorkshopsList );

module.exports = router;