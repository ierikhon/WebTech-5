const express = require('express');
const bodyParser = require('body-parser');
const domain = require('domain');

const sockets = require('./routes/socket');

const routes = require("./routes/routes");
const settings = require("./routes/set");
//const winston = require('./logger');

const server = express();

server.use(express.static(__dirname + "/views"));
server.use('/javascripts', express.static(__dirname + "/javascripts"));
server.use('/stylesheets', express.static(__dirname + "/stylesheets"));
server.use('/lib', express.static(__dirname + "/lib"));
server.use('/data', express.static(__dirname + "/data"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", routes);
server.use("/set", settings);


server.set('view engine', 'pug');
server.set('views', './views');

server.listen(3000, ()=>{
    console.log('Server started at http://localhost:3000');
});
sockets.startSocketServer();