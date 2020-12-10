const express = require('express');
const router = express.Router();
const passwordHash = require("password-hash");
var ObjectId = require('mongodb').ObjectID;
const User = require('../models/user');


var verifyToken = require('../auth/verifyToken')
var generateToken = require('../auth/generateToken');

router.post('/', verifyToken, async(req, res) => {
    const updateProfile = await User.updateMany(
        {email: req.user.email},
        {$push: {
            "favorites": req.body.favorites
        }},
    );
    res.json(updateProfile);
});


router.delete('/', verifyToken, async(req, res) => {
    const updateProfile = await User.updateOne(
        {"favorites": req.body.favorites},
        {$pull: {
            "favorites": req.body.favorites
        }},
    );
    res.json(updateProfile);
});

router.delete('/deletecrypto', verifyToken, async(req, res) => {
    const updateProfile = await User.deleteMany(
        {"favorites": req.body.favorites},
    );
    res.json(updateProfile);
});
module.exports = router;