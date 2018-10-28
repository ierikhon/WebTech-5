var express = require('express');
var router = express.Router();
var gallery = require('./data/gallery');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/html/index.html');
});

router.get("/gallery", (req, res, next)=>{
    res.json(gallery);
    next();
});

module.exports = router;