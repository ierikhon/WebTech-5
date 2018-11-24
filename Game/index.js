const express = require("express");
const router = express.Router();

var map = require('./data/Map');

router.get("/", (req, res, next)=>{
    res.render('index')
});

router.get("/map", (req, res, next)=>{
    res.json(map);
});

module.exports = router;