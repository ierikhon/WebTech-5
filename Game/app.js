const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const routes = require("./index.js");

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", routes);
server.use(express.static(__dirname + "/views"));
server.use(express.static(__dirname + "/html"));
server.use('/javascript', express.static(__dirname + "/javascript"));
server.use('/stylesheets', express.static(__dirname + "/stylesheets"));
server.use('/data', express.static(__dirname + "/data"));

server.set('view engine', 'pug');
server.set('views', './views');

const http_server = http.createServer(server);
http_server.listen(3000, ()=>{
    console.log('Server started at http://localhost:3000');
});

