import React, { Component } from 'react';
import { Stockable } from "./Stockable";

export class Euclid extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: props.userID,
            brokers: props.members,
            settings: props.setting,
            selectedStock: '0'
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
        let jsStocks = JSON.parse(this.props.stock);
        for (let stock in jsStocks)
            if(jsStocks[stock].name === event.name)
                this.setState({selectedStock: stock})
    }

    render(){
        let jsBrokers = JSON.parse(this.state.brokers);

        let jsStocks = JSON.parse(this.props.stock);

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
                    <table border="3" align="center" className="w3-col w3-hoverable s6 w3-table w3-half" id="stock_table">
                        <thead>
                        <tr>
                            <th className="w3-center">Name</th>
                            <th className="w3-center">Price</th>
                            <th className="w3-center">Ammount</th>
                            <th className="w3-center">Law</th>
                        </tr>
                        </thead>
                        <Stockable choosehandler={this.handleStockChange} stocks={jsStocks}/>
                    </table>
                </div>
                <div className='w3-container w3-margin w3-border w3-card'>
                    <p>Buy and Sell</p>
                    <div>
                        <p>Selected stock: {jsStocks[this.state.selectedStock].name} </p>
                        <b>Ammount</b>
                        <input className='w3-margin' type='number' onChange={this.handler}/>
                        <p>Resulting Price:  {jsStocks[this.state.selectedStock].price*this.state.selectedAmmount}</p>
                    </div>
                    <div>
                        <button className='w3-btn w3-margin-bottom w3-green'>Buy</button>
                        <button className='w3-green w3-margin-bottom w3-red w3-btn'>Sell</button>
                        {jsStocks[this.state.selectedStock].price}
                    </div>
                </div>
            </div>
        )
    }
}