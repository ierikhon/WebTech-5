import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {

  brokers: Broker[];
  current_broker: Broker;
  current_broker_id: string;

  constructor() { }

  ngOnInit() {
    this.getBrokerInfo();
  }

  getBrokerInfo() {
    $.ajax({
      url: 'http://localhost:3000/brokers',
      method: 'GET',
      crossDomain: true,
      success: (data) => { this.brokers = data; }
    });
  }

  showdummy() {
    this.current_broker = undefined;
    this.current_broker_id = '' + this.brokers.length;
    $('#name_input').val('');
    $('#price_input').val(0);
    $('#modal').show();
  }

  dismiss_modal() {
    $('#modal').hide();
    $('#db').attr('disabled', 'disabled');
  }

  show_info(broker) {
    $('#db').removeAttr('disabled');
    const self = this;
    this.current_broker = broker;
    for (const id in this.brokers) {
      if (self.brokers[id].name === broker.name) {
        self.current_broker_id = id;
      }
    }
    $('#name_input').val(broker.name);
    $('#price_input').val(broker.price);
    $('#amm_input').val(broker.ammount);
    $('#law_inpur').val(broker.law);
    $('#modal').show();
  }

  save_changes() {
    const self = this;
    const new_name = $('#name_input').val();
    const new_price = $('#price_input').val();
    const new_stock = {name: new_name, price: new_price};

    if (this.current_broker) {
      self.brokers[this.current_broker_id] =  <Broker>new_stock;
    } else {
      self.brokers.push(<Broker>new_stock);
    }
    $('#modal').hide();
    $('#db').attr('disabled', 'disabled');
    this.commitChanges();
  }

  private commitChanges() {
    $.ajax({
      url: 'http://localhost:3000/brokers',
      method: 'PUT',
      data: {dat: this.brokers},
      crossDomain: true
    });
  }

  delete_broker() {
    this.brokers.splice(parseInt(this.current_broker_id, 10), 1);
    $('#modal').hide();
    this.commitChanges();
  }
}

export interface Broker {
  name: string;
  price: number;
}
