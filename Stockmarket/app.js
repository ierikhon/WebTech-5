const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const routes = require("./index.js");

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", cors(), routes);
server.use('/data', express.static(__dirname + "/data"));

const http_server = http.createServer(server);
http_server.listen(3000, ()=>{
    console.log('Server started at http://localhost:3000/members');
});