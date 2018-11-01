const express = require('express');
const router = express.Router();
let gallery = require('./data/gallery');
let members = require('./data/members');
let settings = require('./data/settings');
const fs = require('fs');

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

router.get('/members', function(req, res, next) {
    res.sendFile(__dirname + '/html/members.html');
});

router.get('/settings', function(req, res, next) {
    res.sendFile(__dirname + '/html/settings.html');
});

router.get('/settings2', function(req, res, next) {
    res.json(settings);
});

router.get("/gallery", (req, res, next)=>{
    res.json(gallery);
    next();
});

router.get("/members2", (req, res, next)=>{
    res.json(members);
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

router.put("/members", (req, res, next)=>{
    let obj = req.body;
    if (obj.id == -1)
        obj.id = members.length;
    members[obj.id] = obj.img;
    saveJSON(members, "./data/gallery.json");
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

router.delete('/members/:num([0-9]{1,})', (req, res, next)=>{
    const id = req.params.num;
    if (id in members){
        members.splice(id, 1);
        saveJSON(members, "./data/gallery.json");
        res.json(responseOK());
    }
    else{
        res.json(responseError("Error 403: Wrong id!"));
    }
    next();
});

router.put('/settings', (req, res, next)=>{
    settings = req.body;
    saveJSON(settings, "data/settings.json");
    res.json(responseOK());
    next();
});

module.exports = router;