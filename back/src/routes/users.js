const express = require('express');
const router = express.Router();
const passwordHash = require("password-hash");
var ObjectId = require('mongodb').ObjectID;
const User = require('../models/user');


var verifyToken = require('../auth/verifyToken')
var generateToken = require('../auth/generateToken');

router.get('/', verifyToken, async(req, res) => {
    try {
        var email = req.body.email;
        if (email === undefined) { res.json({status : 400, message: "No user found"});}
        const user = await User.findOne( {email: email});
        res.json({status : 200, message : "success", user: user});
    }
    catch(err) {
        res.json({status : 400, message: "No user found"});
    };    
});

router.get('/:userID', verifyToken, async(req, res) => {    
    try {       
        const profiles = await User.findOne( {_id: req.params.userID});
        res.json({status : 200, message : "success", user : profiles});
    }
    catch(err) {
        res.json({status : 400, message: "No user found"});
    };    
});

router.post('/login', async (req, res) => {

    const { password, email } = req.body;
    
    if (!email || !password) {
        res.status(400).json({status : 400, message: "Invalid request"});
        return
    }
    try {
        const findUser = await User.findOne({ email });
        if (!findUser)
            res.status(401).json({status : 401, message: "No User found"});
        else if (!findUser.authenticate(password)) 
            res.status(401).json({status : 401, message: "can't connect to this account"});
        else {
            const token = await generateToken(findUser);
            res.status(200).json({status : 200, message : "success", user: findUser, token : token})
        }
    } catch(err) {
        res.status(400).json({status : 400, message: "can't connect to this account 3"});
    };
});


router.post('/', async (req, res) => {
    
    if (!req.body.email) {
        res.status(400).json({status : 400, message: "Invalid request"});
        return
    }
    try{  
        const user  = new User({
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            password : passwordHash.generate(req.body.password)
        });
        const savedUser = await user.save();
        res.status(200).json({status : 200, message : "success", user : savedUser});
    } catch(err) {
        res.status(400).json({ status: 400, message: "User creation failed"})
    };
});

router.put('/:userID', verifyToken, async (req, res) => {
    try {
        var email = req.body.email;
        var username = req.body.username;
        const updateUser = await User.updateOne(
            {_id: req.params.userID},
            {$set: {
                email: req.body.email,
                username: req.body.username
            }}
        );
        res.json({status : 200, message : "success", info : updateUser});
    } catch(err) {
        res.json({status: 400, message: "User ID not found. Update failed"});
    };
});

router.delete('/:userID',verifyToken, async(req, res) => {
    try {
        const removedUser = await User.remove({_id: req.params.userID});
        res.json({status : 200, message : "success", info : removedUser});
    } catch(err) {
        res.json({status : 400, message: "User ID not found. Delete failed"});
    };
})

module.exports = router;