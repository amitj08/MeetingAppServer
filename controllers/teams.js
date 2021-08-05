const mongoose = require( 'mongoose' );
const Team = mongoose.model( 'Team' );

const getTeamsByUserId = async ( req, res, next ) => {
    const userId = res.locals.claims.email;
    //console.log(typeof userId);

    try {
        //const filter = { members: { $elemMatch: { userId } } };

        const rs= await Team.find({ members: userId });  
        console.log(rs);
        
        if( rs ) {
            res.status( 200 ).json({
                message: 'success',
                data: rs
            });
        } else {
            const error = new Error( 'There is no team with the id = ' + userId );
            error.status = 404;
            throw error;
        }    
    } catch( error ) {
        error.status = 500;
        error.message= 'Server Side Error';
        return next( error );
    }
};

const postTeams = async ( req, res, next ) => {
    const team = req.body;
    self_user= res.locals.claims.email;
    team.members.push(self_user);
    //console.log(self_user);

    if( !team ) {
        const error = new Error( 'There is no team data' );
        error.status = 400;
        return next( error );
    }

    try {
        const updatedTeam = await Team.create( team );

        res.status( 201 ).json({
            message: 'success',
            data: updatedTeam
        });
    } catch( error ) {
        return next( error );
    }
};

const addMembersById = async ( req, res, next ) => {
    const team= req.body;
    const teamId= req.params.id;
    const memberToAdd = req.params.email;

    try {
        var i= mongoose.Types.ObjectId(teamId);
        console.log(i)
        await Team.updateOne(
            { _id: i } ,
            { $addToSet: { members: memberToAdd }}
        )

        const updatedTeam = await Team.findById( teamId );

        res.status( 200 ).json({
            message: 'success',
            data: updatedTeam
        });
    } catch( error ) {
        return next( error );
    }

};

const leaveTeamById = async ( req, res, next ) => {
    const userId = res.locals.claims.email;
    const teamId = req.params.id;
    
    try {
        const filters = { $pull : { members: {  } } };
        filters.$pull.members=userId;

        const updatedTeam = await Team.findByIdAndUpdate( teamId, filters)
        
        res.status( 201 ).json({
            message: 'success',
            data: updatedTeam
        });
    } catch( error ) {
        return next( error );
    }
};


module.exports = {
    getTeamsByUserId,
    postTeams,
    addMembersById,
    leaveTeamById
};