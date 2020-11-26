const express = require('express');
const mongoose = require('mongoose');
const passwordHash = require("password-hash");


const UserSchema = mongoose.Schema({
    username:
    {
        type: String,
    },
    email:
    {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        sparse:true

    },
    password:
    {
        type: String
    },
    role:
    {
        type: String,
    },
    favorites:
    [{
        type: String,
    }]
});

UserSchema.methods = {
    authenticate: function(password) {
        return passwordHash.verify(password, this.password);
    },
    getToken: function() {
        return jwt.encode(this, config.secret);
    }
};

module.exports = mongoose.model('User', UserSchema);