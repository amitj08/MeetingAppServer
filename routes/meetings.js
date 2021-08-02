const express = require( 'express' );
const { authenticate, authorize } = require( '../utils/auth' );
const { 
    getMeetingsByFilters,
    postMeeting,
    leaveMeetingById,
    addMembersToMeetingById,
    getMeetingsByDate
} = require( '../controllers/meetings' );

const router = express.Router();


router.get( '/', authenticate, authorize( 'general' ), getMeetingsByFilters );
router.post( '/', authenticate,postMeeting );
router.get( '/:date', authenticate, getMeetingsByDate );
router.patch( '/:id', authenticate, leaveMeetingById);
router.patch( '/:id/:email', authenticate, addMembersToMeetingById);

module.exports = router;