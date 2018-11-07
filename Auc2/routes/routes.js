const express = require("express");
const router = express.Router();
//const winston = require('./logger');

router.get("/", (req, res, next)=>{
    res.render('index', {title: 'welcome'})
});

router.get("/start/:un", (req, res, next)=>{
    let name = req.params.un;
    if (name === 'Admin')
        res.render('ketter', {title: 'admin'});
    else res.render('euclid', {title: name});
});

module.exports = router;