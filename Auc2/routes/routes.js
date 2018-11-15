//@flow

const express = require("express");
const router = express.Router();
const winston = require('../logger');

router.get("/", (req, res, next)=>{
    res.render('index', {title: 'welcome'})
});

router.get("/info", (req, res, next)=>{
    res.render('info', {})
});

router.get("/start/:un", (req, res, next)=>{
    let name = req.params.un;
    if (name === 'Admin') {
        winston.verbose("Admin connected!");
        res.render('ketter', {title: 'admin'});
    }
    else res.render('euclid', {title: name});
});

module.exports = router;