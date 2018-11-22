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
        this.state = {
            username: '',
            stocks: null,
            brokers: null,
            settings: null
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

        this.socket.on('market_update', () => {
            this.getInfo();
        });
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
            content = <Ketter stock={this.state.stocks} members={this.state.brokers} setting={this.state.settings} />;
        else {
                content = <Euclid userID={this.state.username} stock={this.state.stocks} members={this.state.brokers}
                                  setting={this.state.settings}/>;
        }
        return (
        <div className="App">
            {content}
        </div>
        );
    }
}

export default App;
