import { Component, OnInit } from '@angular/core';
import { Stock, MarketService } from '../market.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit {
  current_stock: Stock;
  current_stock_id: string;

  constructor(private marketService: MarketService) {
  }

  save_changes_local() {
    this.marketService.save_changes(this.current_stock, this.current_stock_id);
  }

  delete_stock_local() {
    this.marketService.delete_stock(this.current_stock_id);
  }

  ngOnInit() {
  }

  showdummy() {
    this.current_stock = undefined;
    this.current_stock_id = '' + this.get_stocks().length;
    $('#name_input').val('');
    $('#price_input').val(0);
    $('#amm_input').val(10000);
    $('#modal').show();
  }

  dismiss_modal() {
    $('#modal').hide();
    $('#db').attr('disabled', 'disabled');
  }

  show_info(stock) {
    $('#db').removeAttr('disabled');
    const self = this;
    this.current_stock = stock;
    for (const id in this.get_stocks()) {
      if (self.get_stocks()[id].name === stock.name) {
        self.current_stock_id = id;
      }
    }
    $('#name_input').val(stock.name);
    $('#price_input').val(stock.price);
    $('#amm_input').val(stock.ammount);
    $('#law_inpur').val(stock.law);
    $('#modal').show();
  }

  get_stocks() {
    return this.marketService.stocks;
  }
}
