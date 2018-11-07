//const winston = require('./logger');

let info_t;
let sell_t;
let auc_timeout;
let current_picture;
let current_stake;
let cur_price;
let _gallery;

function startSocketServer() {
    const io = require('socket.io').listen(3030);
    console.log("Socket started at http://localhost:3030");
    io.sockets.on('connection', (socket)=>{
        socket.on('connected', (msg)=>{
            socket.name = msg.name;
            send(socket, 'joined', `${msg.name} присоединился к аукциону`);
        });

        socket.on('picture_set', (msg)=>{
            setPictureParams(msg);
        });

        socket.on('start_auction', (msg)=>{
            clearTimeout(auc_timeout);
            startAuc();
        });

        socket.on('user_in', (msg)=>{
            send(socket, 'user_in_info', `${msg.name} участвует в торгах за картину`)
        });

        socket.on('user_stake', (msg)=>{
            cur_price = msg.price;
            current_picture.buyer = msg.name;
            current_picture.sold_price = cur_price;
            send(socket, 'user_stake_info', `${msg.name} поднял цену до ${msg.price}`);
            socket.broadcast.json.emit('user_stake_price', msg);
            socket.json.emit('user_stake_price', msg);
        });
        function startAuc(){
            current_stake = "";
            send(socket, 'start_auc_info', `Открыт аукцион по картине "${current_picture.name}"`);
            setTimeout(stopAuc, sell_t * 1000);
        }


        function stopAuc(){
            let msg = `Аукцион по картине "${current_picture.name}" окончен. '`;
            current_picture.for_auction = false;
            if (current_picture.buyer) {
                msg = msg + `Победитель - ${current_picture.buyer}, цена - ${current_picture.sold_price}`;
                current_picture.save();
            }
            else {
                msg = msg + `Картину никто не купил`;
            }
            send(socket, 'stop_auc', msg);
            socket.json.emit('stop_auc_info', {"id": current_picture._id});
            socket.broadcast.json.emit('stop_auc_info', {"id": current_picture._id});
        }

        function setPictureParams(pic) {
            current_picture = pic.gallery[pic.id];
            _gallery = pic.gallery;
            send(socket, 'picture_init', `Картина ${current_picture.name} поставлена на аукцион`);
            socket.broadcast.json.emit('picture_id', {
                "id": pic.id,
                "start_price": _gallery[pic.id].start_price,
                "min_step": _gallery[pic.id].min_step,
                "max_step": _gallery[pic.id].max_step
            });

        info_t = pic.info_t;
        sell_t = pic.sell_t;
        auc_timeout = setTimeout(() => {
            startAuc()
        }, info_t * 1000)

        }
    })
}

function send(socket, type, msg){
    console.log(`Message: ${type} - ${msg}`);
    let time = (new Date()).toLocaleTimeString();
    let obj = {
        "time": time,
        "message": msg
    };
    socket.json.emit(type, obj);
    socket.broadcast.json.emit(type, obj);
}

module.exports = { startSocketServer };