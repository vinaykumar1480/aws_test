const mongoose = require('mongoose');

const userTpSchema = new mongoose.Schema({
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
        }
}, { collection: 'Touchpoints' });

module.exports = mongoose.model('UserTP', userTpSchema);