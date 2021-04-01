const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserLogin = require('../models/Login');
const bcryptjs = require('bcryptjs');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');

const rSchema = Joi.object().keys({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
const lSchema = Joi.object().keys({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
});

router.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hash_password = await bcryptjs.hash(password, salt);
    let size = 200;
    const sAvatar = "https://gravatar.com/avatar/?s=" + size + '&d=retro';
    const user = new User({
        username: username,
        email: email,
        password: hash_password,
        avatar: sAvatar
    });
    try {
        Joi.assert(req.body, rSchema);
    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.details[0].message,
                data: {}
            });
        }        
    }
    
    /*const user_exist = await User.findOne({ email: email });
    if (user_exist) {
        return res.status(400).send('Email already exist.');
    }*/
   
    try {
        const saveUser = await user.save();
        //res.send(saveUser);
        //res.json(post);
        res.status(200).send({
            status: 200,
            message: 'User registered succesfully.',
            data: saveUser
        });

    } catch (err) {
        if (err["code"] === 11000) {
            var sInvalid = Object.keys(err["keyPattern"])[0];
            res.status(400).send({
                status: 400,
                message: sInvalid + " already existed.",
                data: {}
            });
        } else {
            res.status(400).send({
                status: 400,
                message: err.message,
                data: {}
            });
        }
        //next(err);
    };
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
      
    const userLogin = new UserLogin({
        username: username,
        password: password,
    });

    try {
        Joi.assert(req.body, lSchema);
    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.details[0].message,
                data: {}
            });
        }
    }

    const sUser = await UserLogin.findOne({ username: username });
    if (!sUser) {
        return res.status(400).send({
            status: 400,
            message: "Invalid user details.",
            data: {}
        });
    }
    const sPwd = await bcryptjs.compare(password, sUser.password);
    if (!sPwd) {
        return res.status(400).send({
            status: 400,
            message: "Invalid password.",
            data: {}
        });
    }

    const token = Jwt.sign({ _id: sUser._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    res.status(200).send({
        status: 200,
        message: 'Login succesful.',
        data: sUser,
        token: token
    });
});

router.get('/users', async (req, res, next) => {
    try {
        var reqAttData = await User.find();
        const user = req.user;
        /*if (req.query.id) {
            reqAttData = reqAttData.filter(function (ele) {
                if (ele["UID"] == req.query.id) {
                    return true;
                }
            });*/

        if (reqAttData.length > 0) {
            return res.status(200).send({
                status: 200,
                message: "Subscription.",
                user: user,
                data: reqAttData
            });
        } else {
            res.status(404).send({
                status: 404,
                message: "No Data found.",
                data: {},
                user: user
            });
        }
        /* }*/


    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.message,
                data: {}
            });
        }
    }

})

module.exports = router;