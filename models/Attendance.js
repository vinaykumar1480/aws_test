const mongoose = require('mongoose');

const userAttenSchema = new mongoose.Schema({
    AttenType: {
        type: String,
        required: true,
    },

    Date: {
        type: String,
        required: true,
    },

    District: {
        type: String,
        required: true,
    },

    Location: {
        type: String,
        required: true,
    },

    State: {
        type: String,
        required: true,
    },

    Time: {
        type: String,
        required: true,
    },

    UID: {
        type: String,
        required: true,
    },

    UniqueKey: {
        type: String,
        required: true,
    },

    Village: {
        type: String,
        required: true,
    },

}, { collection: 'Attendance' });

module.exports = mongoose.model('UserAttendance', userAttenSchema);