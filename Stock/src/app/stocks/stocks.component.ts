import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

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
