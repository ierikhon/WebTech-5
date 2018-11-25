import { Component, OnInit } from '@angular/core';
import { Broker, BrokersService } from '../brokers.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {

  current_broker: Broker;
  current_broker_id: string;

  constructor(private brokerService: BrokersService) { }

  ngOnInit() {
  }

  save_changes_local() {
    this.brokerService.save_changes(this.current_broker, this.current_broker_id);
  }

  delete_broker_local() {
    this.brokerService.delete_broker(this.current_broker_id);
  }

  showdummy() {
    this.current_broker = undefined;
    this.current_broker_id = '' + this.get_brokers().length;
    $('#name_input').val('');
    $('#price_input').val(0);
    $('#modal').show();
  }

  dismiss_modal() {
    $('#modal').hide();
    $('#db').attr('disabled', 'disabled');
  }

  get_brokers() {
    return this.brokerService.brokers;
  }

  show_info(broker) {
    $('#db').removeAttr('disabled');
    const self = this;
    this.current_broker = broker;
    for (const id in this.get_brokers()) {
      if (self.get_brokers()[id].name === broker.name) {
        self.current_broker_id = id;
      }
    }
    $('#name_input').val(broker.name);
    $('#price_input').val(broker.price);
    $('#amm_input').val(broker.ammount);
    $('#law_inpur').val(broker.law);
    $('#modal').show();
  }
}
