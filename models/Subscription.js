const mongoose = require('mongoose');

const userSubSchema = new mongoose.Schema({
    Location: {
        type: String,
        required: true,
    },

    MobileNum: {
        type: String,
        required: true,
    },

    Name: {
        type: String,
        required: true,
    },

    TpRef: {
        type: String,
        required: true,
    },

    UID: {
        type: String,
        required: true,
    },

    ValuePack: {
        type: String,
        required: true,
    },

    Notes: {
        type: String,
    }
}, { collection: 'Subscriptions' });

module.exports = mongoose.model('UserSubscription', userSubSchema);