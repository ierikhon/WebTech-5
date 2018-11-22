import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class BrokersService {
  brokers: Broker[];
  constructor() { this.getBrokerInfo(); }

  getBrokerInfo() {
    $.ajax({
      url: 'http://localhost:3001/brokers',
      method: 'GET',
      crossDomain: true,
      success: (data) => { this.brokers = data; }
    });
  }

  save_changes(current_broker, current_broker_id) {
    const self = this;
    const new_name = $('#name_input').val();
    const new_price = $('#price_input').val();
    const new_stock = {name: new_name, price: new_price, onStocks: 0};

    let isHere = false;
    let isHereId = 0;
    for (const stock in this.brokers) {
      if (this.brokers[stock].name === new_name) {
        isHere = true;
        if (stock === current_broker_id) {
          isHereId++;
        }
      }
    }

    if ((isHere && isHereId === 1) || (!isHere)) {
      if (parseInt(<string>new_price, 10) > 0) {
        if (current_broker) {
          self.brokers[current_broker_id] = <Broker>new_stock;
        } else {
          self.brokers.push(<Broker>new_stock);
        }
        $('#modal').hide();
        $('#db').attr('disabled', 'disabled');
        this.commitChanges();
      }
    }
  }

  private commitChanges() {
    $.ajax({
      url: 'http://localhost:3001/brokers',
      method: 'PUT',
      data: {dat: this.brokers},
      crossDomain: true
    });
  }

  delete_broker(current_broker_id) {
    this.brokers.splice(parseInt(current_broker_id, 10), 1);
    $('#modal').hide();
    this.commitChanges();
  }
}

export interface Broker {
  name: string;
  price: number;
}
