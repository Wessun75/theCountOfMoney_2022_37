const express = require('express');
const router = express.Router();
const axios = require("axios");
import manageApp from '../models/manageAppSchema.js';

const verifyToken = require('../auth/verifyToken');

function getCrypto(crypto, res) {
    axios.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + crypto + "&tsyms=EUR")
        .then(function (response) {
            res.json(response.data)
        })
        .catch(function (error) {
            res.json(error);
        })
}

function updateCryptoInDb(params, res) {
    manageApp.update({_id: 1}, params, {upsert: true}, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            res.send(manageApps);
        }
    })
}

router.get('/', function (req, res) {
    manageApp.find({_id: 1}, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            if (manageApps[0].crypto_length.length) {
                getCrypto(manageApps[0].crypto_length, res);
            } else {
                res.status(404).json({status: 404, message: "You must add at least one crypto in the db"});
            }
        }
    })
});

router.get('/length', verifyToken, function (req, res) {
    if (req.user.role === 'admin') {
        manageApp.find({_id: 1}, function (err, manageApps) {
            if (err) {
                res.send(err);
            } else {
                res.send(manageApps[0].crypto_length);
            }
        })
    } else {
        res.status(403).json({status: 403, message: "You are not admin"});
    }
});

router.get('/:crypto', verifyToken, function (req, res) {
    const crypto = req.params.crypto
    manageApp.find({crypto_length: crypto}, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            if (manageApps.length) {
                getCrypto(crypto, res)
            } else {
                res.status(404).json({status: 404, message: "Crypto does not exist in our db"});
            }
        }
    })
})

router.get('/:crypto/history/:period', verifyToken, function (req, res) {
    const crypto = req.params.crypto;
    const period = req.params.period;
    manageApp.find({crypto_length: crypto}, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            if (manageApps.length) {
                axios.get("https://min-api.cryptocompare.com/data/v2/" + period + "?fsym=" + crypto + "&tsym=EUR")
                    .then(function (response) {
                        res.json(response.data)
                    })
                    .catch(function (error) {
                        res.json(error);
                    })
            } else {
                res.status(404).json({status: 404, message: "Crypto does not exist in our db"});
            }
        }
    })
});

router.post('/', verifyToken, function (req, res) {
    if (req.user.role === 'admin') {
        updateCryptoInDb({$push: req.body}, res);
    } else {
        res.status(403).json({status: 403, message: "You are not admin"});
    }
});

router.delete('/', verifyToken, function (req, res) {
    if (req.user.role === 'admin') {
        updateCryptoInDb({$pull: req.body}, res);
    } else {
        res.status(403).json({status: 403, message: "You are not admin"});
    }
});


module.exports = router;