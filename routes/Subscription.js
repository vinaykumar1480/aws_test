const express = require('express').Router();
const verified = require('./verifyJwt');
const subscription = require('../models/Subscription');
const Joi = require('joi');

const subscriptionSchema = Joi.object().keys({
    Location: Joi.string().required(),
    MobileNum: Joi.string().required(),
    Name: Joi.string().required(),
    TpRef: Joi.string().required(),
    UID: Joi.string().required(),
    ValuePack: Joi.string().required(),
    Notes: Joi.string()
});

express.get("/subscription", verified, async (req, res, next) => {
    try {
        var reqAttData = await subscription.find();
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

});

express.post("/subscription", verified, async (req, res, next) => {
    const { Location, MobileNum, Name, TpRef, UID, ValuePack, Notes } = req.body;
    const userDetails = req.user;
    const reqAtt = new subscription({
        Location: Location,
        MobileNum: MobileNum,
        Name: Name,
        TpRef: TpRef,
        UID: UID,
        ValuePack: ValuePack,
        Notes: Notes
    });
    try {
        Joi.assert(req.body, subscriptionSchema);
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
            message: 'Subscription Recorded.',
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