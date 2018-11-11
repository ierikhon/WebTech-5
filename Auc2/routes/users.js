const express = require("express");
const router = express.Router();
//const winston = require('./logger');

let members = require('../data/members');

router.get('/:id', (req, res, next)=>{
    let name = req.params.id;
    let isHere = false;
    for (let mem of members)
        if (mem.name === name) {
            isHere = true;
            res.json({"mem": mem, "newes": false});
        }
    if (!isHere) {
        let len = members.length;
        let newest = {"name": name, "Aquisitions": [], "money": 100000};
        members[len] = newest;
        res.json({"mem":newest, "newes":true});
    }

});

module.exports = router;