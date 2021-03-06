const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const fs = require('fs');
const routes = require("./index.js");

let private_key = fs.readFileSync('ssl/yarik.key');
let certificate = fs.readFileSync('ssl/yarik.csr');

let credentilals = {
    "key": private_key,
    "cert": certificate
};

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", routes);
server.use(express.static(__dirname + "/html"));
server.use('/javascripts', express.static(__dirname + "/javascripts"));
server.use('/css', express.static(__dirname + "/css"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const https_server = https.createServer(credentilals, server);
const http_server = http.createServer(server);

https_server.listen(443, ()=>{ // Запуск
    console.log("HTTPS server started at https://localhost:443")
});

http_server.listen(3000, ()=>{
    console.log('Server started at http://localhost:3000/members');
});
