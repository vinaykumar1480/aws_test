const express = require('express').Router();
const verified = require('./verifyJwt');
const touchpoints = require('../models/Touchpoints');
const Joi = require('joi');

const touchpointSchema = Joi.object().keys({
    Date: Joi.string().required(),
    District: Joi.string().required(),
    Location: Joi.string().required(),
    State: Joi.string().required(),
    Time: Joi.string().required(),
    UID: Joi.string().required(),
    UniqueKey: Joi.string().required(),
    Village: Joi.string().required()
});

express.get("/touchpoints", verified, async (req, res, next) => {
    try {
        const reqAttData = await touchpoints.find();
        const user = req.user;
        if (reqAttData) {
            return res.status(200).send({
                status: 200,
                message: "Touchpoints.",
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

express.post("/touchpoints", verified, async (req, res, next) => {
    const { Date, District, Location, State, Time, UID, UniqueKey, Village } = req.body;
    const userDetails = req.user;
    const reqAtt = new touchpoints({
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
        Joi.assert(req.body, touchpointSchema);
    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.details[0].message,
                data: {}
            });
        }
    }

    try {
        const saveUser = await reqAtt.save();
        res.status(200).send({
            status: 200,
            message: 'Touchpoint Recorded.',
            data: saveUser,
            user: userDetails
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