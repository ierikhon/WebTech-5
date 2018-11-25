import React, { Component } from 'react';
import { Options } from './Options'

export class Euclid extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: props.userID,
            stocks: props.stock,
            brokers: props.members,
            settings: props.setting,
            selectedStock: null
        };
        this.checkLogin = this.checkLogin.bind(this);
        this.checkLogin();
        this.handler = this.handler.bind(this);
        this.handleStockChange = this.handleStockChange.bind(this);
    }

    checkLogin() {
        let jsBrokers = JSON.parse(this.state.brokers);
        for (let brokerID in jsBrokers) {
            if (jsBrokers[brokerID].name === this.state.user)
                this.state.userId = brokerID;
        }
    }

    handler(event){
        this.setState({selectedAmmount: event.target.value})
    }

    handleStockChange(event){
        for (let stock in this.state.stocks)
            if(this.state.stocks[stock].name === event.name)
                this.setState({selectedStock: stock})
    }

    render(){
        function StocksTableRow(stocks, key){
            let stock = stocks.stock;
            return(
                <tr>
                    <th className='w3-center'>{stock.name}</th>
                    <th className='w3-center'>{stock.price}</th>
                    <th className='w3-center'>{stock.ammount}</th>
                    <th className="w3-center">{stock.law}</th>
                </tr>
            )
        }

        function Stocktable(stocks) {
            let rows = [];
            for(let i in stocks.stocks){
                rows.push(<StocksTableRow stock={stocks.stocks[i]} key={i}/>);
            }
            return(
                <tbody>{rows}</tbody>
            )
        }

        let jsBrokers = JSON.parse(this.state.brokers);
        let jsStocks = JSON.parse(this.state.stocks);


        return(
            <div>
                <p className='w3-xxxlarge'>Welcome, {jsBrokers[this.state.userId].name}</p>
                <div className='w3-row w3-container'>
                    <div className='w3-half w3-col' style={{position: 'relative'}}>
                        <p className='w3-xlarge'>Your balance:</p>
                        <p>In money: {jsBrokers[this.state.userId].price}</p>
                        <p>In Stocks: {jsBrokers[this.state.userId].onStocks}</p>
                        <p>Total: {parseInt(jsBrokers[this.state.userId].price) + parseInt(jsBrokers[this.state.userId].onStocks)}</p>
                    </div>
                    <table border="3" align="center" className="w3-col s6 w3-table w3-half" id="stock_table">
                        <thead>
                        <tr>
                            <th className="w3-center">Name</th>
                            <th className="w3-center">Price</th>
                            <th className="w3-center">Ammount</th>
                            <th className="w3-center">Law</th>
                        </tr>
                        </thead>
                        <Stocktable stocks={JSON.parse(this.state.stocks)}/>
                    </table>
                </div>
                <div className='w3-container w3-border w3-card'>
                    <p>Buy and Sell</p>
                        <Options stocks={jsStocks} changeHandler={this.handleStockChange}/>
                    <div>
                        <b>Ammount</b>
                        <input className='w3-margin' type='number' onChange={this.handler}/>

                    </div>
                    <div>
                        <button className='w3-btn w3-margin-bottom w3-green'>Buy</button>
                        <button className='w3-green w3-margin-bottom w3-red w3-btn'>Sell</button>
                    </div>
                </div>
            </div>
        )
    }
}