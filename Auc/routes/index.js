var express = require('express');
var router = express.Router();
var gallery = require('./data/gallery');
var fs = require('fs');
var path = require("path");

function saveJSON(object, path){
    fs.writeFile(path, JSON.stringify(object));
}

function responseError(message){
    return {
        "ok": false,
        "message": message
    }
}

function responseOK(){
    return {
        "ok": true,
        "message": ""
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/html/index.html');
});

router.get("/gallery", (req, res, next)=>{
    res.json(gallery);
    next();
});

router.put("/", (req, res, next)=>{
    let obj = req.body;
    if (obj.id == -1)
        obj.id = gallery.length;
    gallery[obj.id] = obj.img;
    saveJSON(gallery, "./data/gallery.json");
    res.json(responseOK());
    next();
});

router.delete('/:num([0-9]{1,})', (req, res, next)=>{
    const id = req.params.num;
    if (id in gallery){
        gallery.splice(id, 1);
        saveJSON(gallery, "./data/gallery.json");
        res.json(responseOK());
    }
    else{
        res.json(responseError("Error 403: Wrong id!"));
    }
    next();
});

module.exports = router;