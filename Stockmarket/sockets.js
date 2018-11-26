let stocks = require('./data/stocks');
let brokers = require('./data/brokers');
let settings = require('./data/settings');

for (let stock of stocks){
    stock.price = parseInt(stock.price);
    stock.ammount = parseInt(stock.ammount.toString());
}

for (let broker of brokers){
    broker.onStocks = parseInt(broker.onStocks);
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
        socket.on('user_bought', (msg) => {
            if (traidng) {
                buyHandler(msg);
                socket.broadcast.json.emit('market_update', {st: stocks, br: brokers});
                socket.json.emit('market_update', {st: stocks, br: brokers});
            }
        });
        socket.on('user_sold', (msg) => {
            if (traidng) {
                sellHandler(msg);
                socket.broadcast.json.emit('market_update', {st: stocks, br: brokers});
                socket.json.emit('market_update', {st: stocks, br: brokers});
            }
        });
    })
}

function buyHandler(msg) {
    let user = msg.username;
    let stockID = msg.stock;
    let ammountt = parseInt(msg.selectedAmmount);

    for (let br of brokers){
        let already = false;
        if (br.name === user){
            if(br.price >= ammountt*stocks[stockID].price && parseInt(stocks[stockID].ammount) >= ammountt){
                stocks[stockID].ammount -= ammountt;
                br.price -= ammountt*stocks[stockID].price;
                if (br.aquisitions) {
                    for (let aq of br.aquisitions) {
                        if (aq.ID === stockID) {
                            aq.ammount += ammountt;
                            already =  true;
                        }
                    }
                    if (!already){
                        br.aquisitions.push({name: stocks[stockID].name, ammount: ammountt, ID: stockID});
                    }
                } else { br.aquisitions = []; br.aquisitions.push({name: stocks[stockID].name, ammount: ammountt, ID: stockID}); }
            }
        }
    }
    recountOS();
}

function sellHandler(msg) {
    let user = msg.username;
    let stockID = msg.stock;
    let ammount = parseInt(msg.selectedAmmount);

    for (let br of brokers){
        if (br.name === user){
            for (let aqis of br.aquisitions){
                if (aqis.ID === stockID){
                    if(aqis.ammount >= ammount){
                        stocks[stockID].ammount += ammount;
                        br.price += ammount*stocks[stockID].price;
                        aqis.ammount -= ammount;
                    }
                }
            }
        }
    }
    recountOS();
}

function recountOS() {
    for (let broker of brokers){
        broker.onStocks = 0;
        if  (broker.aquisitions) {
            for (let aq of broker.aquisitions) {
                broker.onStocks += aq.ammount * stocks[aq.ID].price;
            }
        }
    }
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
    recountOS();
}

async function timer(socket){
    while(traidng){
        recountStocks();
        socket.broadcast.json.emit('market_update', {st: stocks, br: brokers});
        socket.json.emit('market_update', {st: stocks, br: brokers});
        await sleep(timeout);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { startSocketServer };
