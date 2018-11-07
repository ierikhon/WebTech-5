const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const domain = require('domain');

const sockets = require('./routes/socket');

const routes = require("./routes/routes");
const users = require("./routes/users");
const settings = require("./routes/set");
//const winston = require('./logger');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", routes);
server.use("/users", users);
server.use("/set", settings);

server.set('view engine', 'pug');
server.set('views', './views');

server.listen(3000, ()=>{
    console.log('Server started at http://loclahost:3000');
});
sockets.startSocketServer();