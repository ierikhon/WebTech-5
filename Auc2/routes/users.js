const express = require("express");
const router = express.Router();
const fs = require('fs');
//const winston = require('./logger');

let members = require('../data/members');

function saveJSON(object, path){
    fs.writeFile(path, JSON.stringify(object));
}

router.get('/', (req, res, next)=>{
    res.json(members);
});

router.put('/:id', (req, res, next)=>{
    let name = req.params.id;
    let isHere = false;
    for (let mem of members)
        if (mem.name === name) {
            isHere = true;
        }
    if (!isHere) {
        let len = members.length;
        members[len] = {"name": name, "Aquisitions": [], "money": 100000};
        saveJSON(members, './data/members.json');
    }
    res.json(members);
});

router.put('/setaq/:id', (req, res, next)=>{
    let name = req.params.id;
    let picAquired = req.body;
    for (let id in members)
        if (members[id].name === name)
            members[id].Aquisitions.append(picAquired);
    saveJSON(members, './data/members.json');
});

module.exports = router;