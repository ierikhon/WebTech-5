import React, { Component } from 'react';

export class Euclid extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: props.userID,
            stocks: props.stock,
            brokers: props.members,
            settings: props.setting
        };
        this.checkLogin = this.checkLogin.bind(this);
        this.checkLogin();
    }

    checkLogin() {
        let jsBrokers = JSON.parse(this.state.brokers);
        for (let brokerID in jsBrokers) {
            if (jsBrokers[brokerID].name === this.state.user)
                this.state.userId = brokerID;
        }
    }

    render(){
        function StocksTableRow(stocks){
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
                rows.push(<StocksTableRow stock={stocks.stocks[i]} key={i} />);
            }
            return(
                <tbody>{rows}</tbody>
            )
        }

        let jsBrokers = JSON.parse(this.state.brokers);

        return(
            <div>
                <p className='w3-xxxlarge'>Welcome, {jsBrokers[this.state.userId].name}</p>
                <div className='w3-row'>
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
            </div>
        )
    }
}