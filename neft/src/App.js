import React, { Component } from 'react';
import { Loginpage } from './loginPage/Loginpage'
import { Ketter } from './AdminPage/Ketter'
import { Euclid } from './BrokerPage/Euclid'

import './App.css';
import $ from 'jquery';
import * as io from 'socket.io-client'

class App extends Component {
    constructor() {
        super();
        this.getInfo();
        this.socket = null;
        this.handler = this.handler.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.startDay = this.startDay.bind(this);
        this.finishDay = this.finishDay.bind(this);
        this.sell = this.sell.bind(this);
        this.buy = this.buy.bind(this);
        this.state = {
            username: '',
            stocks: null,
            brokers: null,
            settings: null,
            trading: true,
            message: ''
        };
    }

    handler(event){
        this.setState({login: event.target.value})
    }

    onLogin(login){
        this.setState({username: login});

        this.socket = io.connect('http://localhost:3030');

        this.socket.on("connect", () => {
            this.socket.json.emit("connected", {"name": this.state.username});
        });

        this.socket.on('market_update', (info) => {
            this.setState({stocks: JSON.stringify(info.st), brokers: JSON.stringify(info.br)})
        });
    }

    buy(userID, stockID, ammount){
        if (ammount && ammount>0) {
            if (this.state.trading) {
                this.setState({message: ''});
                this.socket.json.emit('user_bought', {username: userID, stock: stockID, selectedAmmount: ammount});
            } else {
                this.setState({message: 'Trade has not yet been started'})
            }
        } else this.setState({message: 'Incorrect ammount'})
    }

    sell(userID, stockID, ammount){
        if (ammount && ammount>0) {
            if (this.state.trading) {
                this.setState({message: ''});
                this.socket.json.emit('user_sold', {username: userID, stock: stockID, selectedAmmount: ammount});
            } else {
                this.setState({message: 'Trade has not yet been started'})
            }
        } else this.setState({message: 'Incorrect ammount'})
    }

    startDay(){
        this.socket.json.emit('day_started');
    }

    finishDay(){
        this.socket.json.emit('day_finished');
    }

    getInfo(){
        $.ajax({
            url: 'http://localhost:3001/stocks',
            method: 'GET',
            crossDomain: true,
            success: (stocksInfo)=>{ this.setState({stocks: JSON.stringify(stocksInfo)})}
        });

        $.ajax({
            url: 'http://localhost:3001/brokers',
            method: 'GET',
            crossDomain: true,
            success: (brokersInfo)=>{ this.setState({brokers: JSON.stringify(brokersInfo)}) }
        });

        $.ajax({
            url: 'http://localhost:3001/settings',
            method: 'GET',
            crossDomain: true,
            success: (setInfo)=>{ this.setState({settings: JSON.stringify(setInfo)}) }
        })
    }


    render() {
        let content;
        if (this.state.username === '')
            content = <Loginpage login={this.onLogin}/>;
        else if (this.state.username === 'Admin')
            content = <Ketter startDay={this.startDay} finishDay={this.finishDay} stock={this.state.stocks} members={this.state.brokers} setting={this.state.settings} />;
        else {
                content = <Euclid buy={this.buy} sell={this.sell} userID={this.state.username} stock={this.state.stocks} members={this.state.brokers}
                                  setting={this.state.settings}/>;
        }
        return (
        <div className="App">
            {content}
            {this.state.message}
        </div>
        );
    }
}

export default App;
