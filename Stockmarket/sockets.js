let username;

function startSocketServer() {
    const io = require('socket.io').listen(3030);
    io.sockets.on('connection', (socket) => {
        socket.on('connected', (msg) => {
            socket.name = msg.name;
            username = msg.name;
            socket.broadcast.json.emit('market_update');
            socket.json.emit('market_update');
        });
    })
}

module.exports = { startSocketServer };