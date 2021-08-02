const express = require( 'express' );
const { authenticate } = require( '../utils/auth' );
const { getTeamsByUserId, postTeams, addMembersById, leaveTeamById } = require( '../controllers/teams' );

const router = express.Router();

router.get( '/', authenticate, getTeamsByUserId );
router.post( '/', authenticate, postTeams );
router.patch( '/:id', authenticate, leaveTeamById);
router.patch( '/:id/:email', authenticate, addMembersById);


module.exports = router;