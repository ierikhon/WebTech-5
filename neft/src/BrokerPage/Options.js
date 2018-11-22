import React, { Component } from 'react';
export class Options extends Component{
    constructor(props){
        super(props);
        this.state = {
            stocks: props.stocks,
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(event){
        this.setState({selectedStock: event.target.value});
    }

    acceptChoose(){
        this.props.changeHandler(this.state.selectedStock);
    }

    render(){
        function Option(stock) {
            let st = stock.stock;
            return(
                <option value={st.name}>{st.name}</option>
            )
        }
        let options = [];
        for(let key in this.state.stocks)
            options.push(<Option stock={this.state.stocks[key]} key={key}/>)
        return(
            <div>
                <select className='w3-select' onChange={this.changeHandler}>{options}</select>
                <button className='w3-btn w3-margin w3-deep-orange' onClick={this.acceptChoose}>Choose</button>
            </div>
        )
}
}