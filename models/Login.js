const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { collection: 'Users' });

module.exports = mongoose.model('UserLoginSchema', userLoginSchema);