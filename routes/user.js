const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

router.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        let user = new User();
        user.username = username;
        user.email = email;
        const salt = await bcryptjs.genSaltSync(10);
        user.password = await bcryptjs.hash(password, salt);
        //user.password = password;

        let size = 200;
        user.avatar = "https://gravatar.com/avatar/?s=" + size + '&d=retro';
        
        await user.save();

        res.json({
            success: true,
            msg: 'User registered.',
            user: user
        });
    } catch (err) {
        if (err.code === 11000) {
            res.json({
                success: false,
                msg: 'User already exist.'
            });
        }
        throw err;
    };
});

module.exports = router;