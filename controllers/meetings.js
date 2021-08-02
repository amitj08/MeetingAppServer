const mongoose = require( 'mongoose' );
const Meeting = mongoose.model( 'Meeting' );

const getMeetingsByFilters = async( req, res, next) => {
    console.log(req.query);
    const userId = res.locals.claims.email;       //email
    const dateToSearch = new Date(req.query.date);       //new Date('2020-09-16');
    const search = req.query.search;
    const period = req.query.period;
    //console.log("userId ="+userId );
    //console.log("date = "+dateToSearch);
    //console.log("search = "+search);
    //console.log("period = "+period);

    try {
        const filter = { date: { }, attendees: { }, description: { } };

        if( userId ) {
            filter.attendees = userId;
        }
        if( search ) {
            filter.description = { $regex: new RegExp( search, 'i' ) };
        } else {
            delete filter.description;
        }
    
        const today = new Date( new Date().toISOString().substring( 0, 10 ) );
        const tomorrow = new Date();
        tomorrow.setDate( today.getDate() + 1 );
        const nextDate = new Date();
        nextDate.setDate(dateToSearch.getDate() + 1);

        switch( period ) {
            case 'PAST': 
                filter.date = { $lt: today };
                break;
            case 'TODAY':
                filter.date = { $gte: today, $lte: tomorrow };
                break;
            case 'UPCOMING':
                filter.date = { $gt: today };
                break;
            default:
                delete filter.date;
        }
        if( dateToSearch ) {
            filter.date = { $gte: dateToSearch , $lte: nextDate };
        }
        
        //console.log(filter);
        const meetings = await Meeting.find( filter ).sort( { date: -1 } );
        console.log(meetings);
        res.status( 201 ).json({
            message: 'success',
            data: meetings
        });
        
    } catch ( error ) {
        if( error instanceof mongoose.Error ) {
            error.status = 400;
            error.message = 'Required fields are missing with proper format';
        } else {
            error.status = 500;
            error.message = 'Server Side Error';
        }
        next( error );
    }
};

const postMeeting = async ( req, res, next ) => {
    console.log("sss");
    const meeting = req.body;
    self_user= res.locals.claims.email;
    meeting.attendees.push(self_user);
    //console.log(self_user);

    if( !meeting ) {
        const error = new Error( 'There is no meeting data' );
        error.status = 400;
        return next( error );
    }

    try {
        const updatedMeeting = await Meeting.create( meeting );

        res.status( 201 ).json({
            message: 'success',
            data: updatedMeeting
        });
    } catch( error ) {
        return next( error );
    }
};

const addMembersToMeetingById = async ( req, res, next ) => {
    const meeting= req.body;
    const meetingId= req.params.id;
    const attendeeToAdd = req.params.email;

    try {
        var i= mongoose.Types.ObjectId(meetingId);
        console.log(i)
        await Meeting.updateOne(
            { _id: i } ,
            { $addToSet: { attendees: attendeeToAdd }}
        )

        const updatedMeeting = await Meeting.findById( meetingId );

        res.status( 200 ).json({
            message: 'success',
            data: updatedMeeting
        });
    } catch( error ) {
        return next( error );
    }

};

const leaveMeetingById = async ( req, res, next ) => {
    const userId = res.locals.claims.email;
    const meetingId = req.params.id;
    
    try {
        const filters = { $pull : { attendees: {  } } };
        filters.$pull.attendees=userId;

        const updatedMeeting = await Meeting.findByIdAndUpdate( meetingId, filters)
        
        res.status( 201 ).json({
            message: 'success',
            data: updatedMeeting
        });
    } catch( error ) {
        return next( error );
    }
};


module.exports = {
    getMeetingsByFilters,
    postMeeting,
    leaveMeetingById,
    addMembersToMeetingById
};

