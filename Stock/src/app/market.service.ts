import {Injectable, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  stocks: Stock[];
  constructor() { this.getStockInfo(); }

  save_changes(current_stock, current_stock_id) {
    const self = this;
    const new_name = $('#name_input').val();
    const new_price = $('#price_input').val();
    const new_law = $('#law_input').val();
    const new_ammount = $('#amm_input').val();
    const new_stock = {name: new_name, price: new_price, law: new_law, ammount: new_ammount};

    if (current_stock) {
      self.stocks[current_stock_id] =  <Stock>new_stock;
    } else {
      self.stocks.push(<Stock>new_stock);
    }
    $('#modal').hide();
    $('#db').attr('disabled', 'disabled');
    this.commitChanges();
  }

  getStockInfo() {
    $.ajax({
      url: 'http://localhost:3001/stocks',
      method: 'GET',
      crossDomain: true,
      success: (data) => {
        this.stocks = data;
      }
    });
  }

  private commitChanges() {
    $.ajax({
      url: 'http://localhost:3001/stocks',
      method: 'PUT',
      data: {dat: this.stocks},
      crossDomain: true
    });
  }

  delete_stock(current_stock_id) {
    this.stocks.splice(parseInt(current_stock_id, 10), 1);
    $('#modal').hide();
    this.commitChanges();
  }
}

export interface Stock {
  name: string;
  price: number;
  law: string;
  ammount: number;
}
