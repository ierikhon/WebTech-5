import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  current_view: string;

  constructor() {}

  ngOnInit() {
    this.current_view = 'stocks';
  }

  showStocks() {
    this.current_view = 'stocks';
  }

  showBrokers() {
    this.current_view = 'brokers';
  }

  showSettings() {
    this.current_view = 'settings';
  }
}
