import React, { Component } from 'react';

export class Stockable extends Component {

    cclicked(stock){
        this.props.choosehandler(stock);
    }

    render() {
        let rows = [];
        for (let stock of this.props.stocks) {
            rows.push(
                <tr key={stock.name} onClick={this.cclicked.bind(this, stock)}>
                    <th className='w3-center'>{stock.name}</th>
                    <th className='w3-center'>{stock.price}</th>
                    <th className='w3-center'>{stock.ammount}</th>
                    <th className="w3-center">{stock.law}</th>
                </tr>
            );
        }
        return (
            <tbody>{rows}</tbody>
        )
    }
}