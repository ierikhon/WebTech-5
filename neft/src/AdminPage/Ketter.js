import React, { Component } from 'react';
import $ from 'jquery'

export class Ketter extends Component{
    constructor(props){
        super(props);
        Ketter.showInfo = Ketter.showInfo.bind(this);
        Ketter.dismissmodal = Ketter.dismissmodal.bind(this);
        this.finishDay = this.finishDay.bind(this);
        this.startDay = this.startDay.bind(this);
    }

    static showInfo(broker){
        if (broker.aquisitions)
            $('#brokeraq').empty().append(broker.aquisitions);
        else
            $('#brokeraq').empty().append("No aquisitions yet");
        $('#modal').show()
    }

    static dismissmodal(){
        $('#modal').hide()
    }

    startDay(){
        this.props.startDay();
    }

    finishDay(){
        this.props.finishDay();
    }

    render(){
        function BrokersTableRow(brokers){
            const broker = brokers.broker;
            return(
                <tr onClick={Ketter.showInfo(broker)}>
                    <th className='w3-center'>{broker.name}</th>
                    <th className='w3-center'>{broker.price}</th>
                    <th className='w3-center'>{broker.onStocks}</th>
                    <th className="w3-center">{parseInt(broker.price) + parseInt(broker.onStocks)}</th>
                </tr>
            )
        }

        function BrokersTable(brokers) {
            let rows = [];
            for(let i in brokers.broker){
                rows.push(<BrokersTableRow broker={brokers.broker[i]} key={i} />);
            }
            return(
                <tbody>{rows}</tbody>
            )
        }

        function Modal() {
                return(
                    <div id="modal" className="w3-modal">
                        <div className="w3-modal-content">
                            <div className="w3-container">
                                <div id='brokeraq'> </div>
                                <button className="w3-btn w3-red w3-margin" onClick={Ketter.dismissmodal}>Ok</button>
                            </div>
                        </div>
                    </div>
                );
        }

        return(
            <div>
                <p className='w3-xxxlarge'>Admin Page</p>
                        <table border="3" align="center" className="w3-table w3-striped w3-hoverable" id="stock_table">
                            <thead>
                            <tr>
                                <th className="w3-center">Name</th>
                                <th className="w3-center">Money</th>
                                <th className="w3-center">On stocks</th>
                                <th className="w3-center">Total</th>
                            </tr>
                            </thead>
                            <BrokersTable broker={JSON.parse(this.props.members)}/>
                        </table>
                <Modal/>
                <button className='w3-btn w3-green w3-margin-top' onClick={this.startDay}>Start day</button>
                <button className='w3-btn w3-red w3-margin-top' onClick={this.finishDay}>Finish day</button>
            </div>
        )
    }

}