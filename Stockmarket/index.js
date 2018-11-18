const express = require('express');
const router = express.Router();
const fs = require("fs");

let stocks = require('./data/stocks');

function saveJSON(object, path){
    fs.writeFile(path, JSON.stringify(object));
}

router.get('/Stocks', function(req, res, next) {
    res.json(stocks);
});

router.put('/Stocks', function(req, res, next) {
    let data = req.body;
    saveJSON(data.dat, './data/stocks.json');
});

module.exports =  router;