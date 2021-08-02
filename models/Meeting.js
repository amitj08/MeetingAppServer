const mongoose = require( 'mongoose' );

const timeSchema = new mongoose.Schema({
    _id: false, // prevent creation of _id field
    hours: {
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    minutes: {
        type: Number,
        required: true,
        min: 0,
        max: 59
    }
});

const meetingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        minLength: 50
    },
    date: {
        type: Date,
        default: Date.now
    },
    startTime: {
        type: timeSchema,
        required: true
    },
    endTime: {
        type: timeSchema,
        required: true
    },
    attendees: {
        type: [ String ],
    }
    
});

// create and register model called Workshop
// the collection where documents will be inserted is 'workshops'
mongoose.model( 'Meeting', meetingSchema );