import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit {
  stocks: Stock[];
  current_stock: Stock;
  current_stock_id: string;

  constructor() { }

  async ngOnInit() {
    this.getStockInfo();
  }

  getStockInfo() {
    $.ajax({
      url: 'http://localhost:3000/stocks',
      method: 'GET',
      crossDomain: true,
      success: (data) => { this.stocks = data; }
    });
  }

  showdummy() {
    this.current_stock = undefined;
    this.current_stock_id = '' + this.stocks.length;
    $('#name_input').val('');
    $('#price_input').val(0);
    $('#amm_input').val(10000);
    $('#modal').show();
  }

  dismiss_modal() {
    $('#modal').hide();
  }

  show_info(stock) {
    const self = this;
    this.current_stock = stock;
    for (const id in this.stocks) {
      if (self.stocks[id].name === stock.name) {
        self.current_stock_id = id;
      }
    }
    $('#name_input').val(stock.name);
    $('#price_input').val(stock.price);
    $('#amm_input').val(stock.ammount);
    $('#law_inpur').val(stock.law);
    $('#modal').show();
  }

  save_changes() {
    const self = this;
    const new_name = $('#name_input').val();
    const new_price = $('#price_input').val();
    const new_law = $('#law_input').val();
    const new_ammount = $('#amm_input').val();
    const new_stock = {name: new_name, price: new_price, law: new_law, ammount: new_ammount};

    if (this.current_stock) {
      self.stocks[this.current_stock_id] =  <Stock>new_stock;
    } else {
      self.stocks.push(<Stock>new_stock);
    }
    $('#modal').hide();

    $.ajax({
      url: 'http://localhost:3000/stocks',
      method: 'PUT',
      data: {dat: self.stocks},
      crossDomain: true
    });
  }
}

export interface Stock {
  name: string;
  price: number;
  law: string;
  ammount: number;
}
