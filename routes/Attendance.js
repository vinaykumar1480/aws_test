const express = require('express').Router();
const verified = require('./verifyJwt');
const attendance = require('../models/Attendance');
const Joi = require('joi');

const attSchema = Joi.object().keys({
    AttenType: Joi.string().required(),
    Date: Joi.string().required(),
    District: Joi.string().required(),
    Location: Joi.string().required(),
    State: Joi.string().required(),
    Time: Joi.string().required(),
    UID: Joi.string().required(),
    UniqueKey: Joi.string().required(),
    Village: Joi.string().required(),
});

express.get("/attendance", verified, async (req, res, next) => {
    try {
        const reqAttData = await attendance.find();
        const user = req.user;
        if (reqAttData) {
            return res.status(200).send({
                status: 200,
                message: "Attendance.",
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
    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.message,
                data: {}
            });
        }
    }  
    
});

express.post("/attendance", verified, async (req, res, next) => {
    const { AttenType, Date, District, Location, State, Time, UID, UniqueKey, Village } = req.body;
    const userDetails = req.user;
    const reqAtt = new attendance({
        AttenType: AttenType,
        Date: Date,
        District: District,
        Location: Location,
        State: State,
        Time: Time,
        UID: UID,
        UniqueKey: UniqueKey,
        Village: Village
    });
    try {
        Joi.assert(req.body, attSchema);
    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.details[0].message,
                data: {},
            });
        }
    }

    try {
        const saveUser = await reqAtt.save();
        res.status(200).send({
            status: 200,
            message: 'Attendance Recorded.',
            data: saveUser,
            user: userDetails,
        });

    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message,
            data: {}
        });
    };
});

module.exports = express;