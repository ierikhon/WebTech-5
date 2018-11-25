let stocks = require('./data/stocks');
let brokers = require('./data/brokers');
let settings = require('./data/settings');

for (let stock of stocks){
    stock.price = parseInt(stock.price);
}

let usernames = [];
let time = (parseInt(settings.timeout.slice(0,2))*60 +
    parseInt(settings.timeout.slice(3,5)));
timeout = 2000;
let traidng = false;


function startSocketServer() {
    const io = require('socket.io').listen(3030);
    io.sockets.on('connection', (socket) => {
        socket.on('connected', (msg) => {
            if (! msg.name in usernames)
                socket.name = msg.name;
        });
        socket.on('day_started', () => {
            traidng = true;
            timer(socket);
        });
        socket.on('day_finished', () => {
            traidng = false;
        });
    })
}

/**
 * @return {number}
 */
function GaussRand() {
    var s = 2*Math.random()-1;
    var m = 2*Math.random()-1;
    var u = s*s + m*m;
    if(u === 0 || u > 1) return GaussRand();
    return s*m;
}


function recountStocks() {
    for (let stock of stocks){
        if (stock.law === 'random'){
            stock.price = Math.random()*1000
        } else if (stock.law === 'binom'){
            const val = parseInt(Math.random() * 100)%2;
            if (val === 0)
                stock.price += 312;
            else stock.price -= 312;
        } else {
            stock.price += GaussRand()*100;
        }
    }
}

async function timer(socket){
    while(traidng){
        recountStocks();
        socket.broadcast.json.emit('market_update', {st: stocks, to: timeout});
        socket.json.emit('market_update', {st: stocks, to: timeout});
        console.log(time);
        await sleep(timeout);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { startSocketServer };