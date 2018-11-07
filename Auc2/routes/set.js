const express = require("express");
const router = express.Router();
const multer = require("multer");
//const winston = require('./logger');

let pictures = require('../data/gallery');
let settings = require('../data/settings');

const fs = require('fs');
const upload = multer({
    dest: 'uploads/'
});

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