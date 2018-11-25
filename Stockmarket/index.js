const express = require('express');
const router = express.Router();
const fs = require("fs");

let stocks = require('./data/stocks');
let brokers = require('./data/brokers');
let settings = require('./data/settings');

function saveJSON(object, path){
    fs.writeFile(path, JSON.stringify(object));
}

router.get('/Stocks', function(req, res, next) {
    res.json(stocks);
});

router.put('/Stocks', function(req, res, next) {
    let data = req.body;
    stocks = data.dat;
    saveJSON(data.dat, './data/stocks.json');
});

router.get('/settings', function(req, res, next) {
    res.json(settings);
});

router.put('/settings', function(req, res, next) {
    let data = req.body;
    settings = data.dat;
    saveJSON(data.dat, './data/settings.json');
});


router.get('/brokers', function(req, res, next) {
    res.json(brokers);
});

router.put('/brokers', function(req, res, next) {
    let data = req.body;
    brokers = data.dat;
    saveJSON(data.dat, './data/brokers.json');
});

module.exports =  router;