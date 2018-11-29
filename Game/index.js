const express = require("express");
const router = express.Router();

var map = require('./data/Map');
const fs = require("fs");

function saveJSON(object, path){
    fs.writeFile(path, JSON.stringify(object));
}

router.get("/", (req, res, next)=>{
    res.render('index')
});

router.get("/map", (req, res, next)=>{
    res.json(map);
});

router.put("/set", (req, res, next)=>{
    let info = req.body;
    saveJSON(info, './data/records.json');
});

module.exports = router;