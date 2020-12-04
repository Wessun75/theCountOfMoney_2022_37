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
    manageApp.findByIdAndUpdate(1, params, {upsert: true}, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            res.send(manageApps);
        }
    })
}

router.get('/', function (req, res) {
    manageApp.findById(1, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            if (manageApps) {
                if (manageApps.crypto_length.length) {
                    getCrypto(manageApps.crypto_length, res);
                } else {
                    res.status(404).json({status: 404, message: "You must add at least one crypto in the db"});
                }
            } else {
                res.status(404).json({status: 404, message: "Your db is empty"})
            }
        }
    })
});

router.get('/length', verifyToken, function (req, res) {
    if (req.user.role === 'admin') {
        manageApp.findById(1, function (err, manageApps) {
            if (err) {
                res.send(err);
            } else {
                if (manageApps) {
                    res.send(manageApps.crypto_length);
                } else {
                    res.status(404).json({status: 404, message: "Your db is empty"})
                }
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


router.get('/list', verifyToken, function (req, res) {
    if (req.user.role === 'admin') {
        axios.get("https://min-api.cryptocompare.com/data/blockchain/list?api_key=ebf13d6fe001b0bc3c7dacef525aa62d2bd07cfeac0a1b4073dac7d6b270e60d")
            .then(function (response) {
                res.json(response.data)
            })
            .catch(function (error) {
                res.json(error);
            })
    } else {
        res.status(403).json({status: 403, message: "You are not admin"});
    }
})

router.get('/:crypto/history/:period', verifyToken, function (req, res) {
    const crypto = req.params.crypto;
    const period = req.params.period;
    const limit = 'histohour' === period ? "limit=48" : "limit=60";
    manageApp.find({crypto_length: crypto}, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            if (manageApps.length) {
                axios.get("https://min-api.cryptocompare.com/data/v2/" + period + "?fsym=" + crypto + "&tsym=EUR&" + limit)
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