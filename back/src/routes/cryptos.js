const express = require('express');
const router = express.Router();
const axios = require("axios");
const mongoose = require('mongoose');
import manageAppSchema from '../models/manageAppSchema.js';

const manageApp = mongoose.model('manage_app', manageAppSchema);

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
    manageApp.update({test: 'oui'}, params, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            res.send(manageApps);
        }
    })
}

router.get('/', function (req, res) {
    manageApp.find(function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            getCrypto(manageApps[0].crypto_length, res);
        }
    })
});

router.get('/length', function (req, res) {
    //admin
    manageApp.find({test: 'oui'}, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            res.send(manageApps[0].crypto_length);
        }
    })
});

router.get('/:crypto', function (req, res) {
    const crypto = req.params.crypto
    manageApp.find({crypto_length: crypto}, function (err, manageApps) {
        if (err) {
            res.send(err);
        } else {
            if (manageApps.length) {
                getCrypto(crypto, res)
            } else {
                res.send("Crypto does not exist in our db")
            }
        }
    })
})

router.post('/', function (req, res) {
    //admin
    updateCryptoInDb({$push: req.body}, res);
});

router.delete('/', function (req, res) {
    //admin
    updateCryptoInDb({$pull: req.body}, res);
});

router.get('/:crypto/history/:period', function (req, res) {
    //admin
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
                res.send("Crypto does not exist in our db")
            }
        }
    })
});
module.exports = router;