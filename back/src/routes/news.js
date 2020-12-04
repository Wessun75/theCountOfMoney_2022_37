const express = require('express');
const router = express.Router();
const axios = require("axios");
const passwordHash = require("password-hash");
var ObjectId = require('mongodb').ObjectID;
const User = require('../models/user');


var verifyToken = require('../auth/verifyToken')
var generateToken = require('../auth/generateToken');

const NewsApiKey = "3f1b41a21f12460b9bdd5759fdd08dd0";
var page = 1;


router.get('/trending', async(req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    try {
        axios.get("http://newsapi.org/v2/everything?q=crypto&from="+ today+ "2020-10-27&sortBy=publishedAt&apiKey=" + NewsApiKey)
        .then(function (response) {
            res.json(response.data)
        })
        .catch(function (error) {
            res.json(error);
        })
    } catch(err) {
            res.json({status : 400, message: "Can't get top trending"});
    }
});


router.get('/forMe',verifyToken, async(req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    try {
        const user = await User.findOne( {"_id" : req.user.id});
        const fav = user.favorites
        var result = [];

        for (let item of fav) {
            await axios.get("https://newsapi.org/v2/everything?q="  + item + "&sortBy=publishedAt&apiKey=" + NewsApiKey + "&pageSize=5&page=" + page)
            .then(response => {
                for (let articles of response.data.articles) {
                    result.push(articles);
                }
            }).catch(err => {res.json("request error")});
        }
        page += 1;
        if (page > 10)
            page = 1
        res.json(result)
    } catch(err) {
            res.json({status : 400, message: "Can't get top trending", "error": err});
    }
});


module.exports = router;