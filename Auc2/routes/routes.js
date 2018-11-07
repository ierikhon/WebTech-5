const express = require("express");
const router = express.Router();
//const winston = require('./logger');

router.get("/", (req, res, next)=>{
    let name = req.body;
    if (name === 'Admin')
        res.render('ketter', {title: 'admin'});
    else res.render('eudlid', {title: 'user'});
});