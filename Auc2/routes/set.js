const express = require("express");
const router = express.Router();
//const winston = require('./logger');

let pictures = require('../data/gallery');
let settings = require('../data/settings');

const fs = require('fs');

function responseOK(){
    return {
        "ok": true,
        "message": ""
    }
}

function saveJSON(object, path){
    fs.writeFile(path, JSON.stringify(object));
}

router.get('/picture/:id', (req, res, next)=>{
    let num = req.params.id;
    res.json(pictures[num]);
});

router.get('/gallery', (req, res, next)=>{
    res.json(pictures);
});

router.get('/settings', (req, res, next)=>{
    res.json(settings);
});


module.exports = router;