import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showdummy() {
    $('#name_input').val('');
    $('#price_input').val(0);
    $('#amm_input').val(10000);
    $('#modal').show();
  }

  dismiss_modal() {
    $('#modal').hide();
  }

}
