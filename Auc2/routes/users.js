//@flow

const express = require("express");
const router = express.Router();
const fs = require('fs');
const winston = require('../logger');

let members = require('../data/members');

function saveJSON(object, path){
    fs.writeFile(path, JSON.stringify(object));
}

function test_addpicture(name, picAquired) {
    let t_mem = [{name:'Vasya', Aquisitions:[], money: 100000}];
    let notHere = true;
    for (let mem of t_mem)
        if (mem.name === name) {
            notHere = false;
            break;
        }
    if (notHere)
        return Promise.reject();
    else {
        for (let id in t_mem)
            if (t_mem[id].name === name) {
                t_mem[id].Aquisitions[t_mem[id].Aquisitions.length] = picAquired;
                t_mem[id].money -= picAquired.sold_price;
            }
        return Promise.resolve(t_mem);
    }

}

function test_adduser(name){
    let t_mem = [];
    let isHere = false;
    for (let mem of t_mem)
        if (mem.name === name) {
            isHere = true;
            return Promise.reject();
        }
    if (!isHere) {
        let len = t_mem.length;
        t_mem[len] = {"name": name, "Aquisitions": [], "money": 1000000};
        return Promise.resolve(t_mem);
    }
}

router.get('/', (req, res, next)=>{
    res.json(members);
});

router.get('/budget/:id', (req, res, next)=>{
    let user = req.params.id;
    for (let mem of members)
        if (mem.name === user) {
            res.json({"money": mem.money});
            break;
        }
});

router.get('/:id', (req, res, next)=>{
    let id = req.params.id;
    for (let mem of members)
        if (mem.name === id) {
            res.json(mem);
            break;
        }
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
        members[len] = {"name": name, "Aquisitions": [], "money": 1000000};
        saveJSON(members, './data/members.json');
        winston.verbose("New user in our rows:" + name);
    }
    res.json(members);
});

router.get('/', (req, res, next)=>{
    res.json(members);
});

router.put('/setaq/:id', (req, res, next)=>{
    let name = req.params.id;
    let picAquired = req.body;
    for (let id in members)
        if (members[id].name === name) {
            members[id].Aquisitions[members[id].Aquisitions.length] = picAquired;
            members[id].money -= picAquired.sold_price;
        }
    saveJSON(members, './data/members.json');
    winston.verbose("Congrats to " + name + "! This man just aquired the picture " + picAquired.name);
});

module.exports = {router, test_adduser, test_addpicture};