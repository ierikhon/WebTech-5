import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor() { }

  ngOnInit() {
    this.getSettingsInfo();
  }

  save_change() {
    const new_day = $('#date_input').val();
    const new_sitme = $('#stime_input').val();
    const new_ftime = $('#ftime_input').val();
    const new_timeout = $('#timeout_input').val();
    const new_settings = {day: new_day, stime: new_sitme, ftime: new_ftime, timeout: new_timeout};
    this.settings = <Settings>new_settings;

    $.ajax({
      url: 'http://localhost:3000/settings',
      method: 'PUT',
      data: {dat: this.settings},
      crossDomain: true
    });
  }

  private getSettingsInfo() {
    $.ajax({
      url: 'http://localhost:3000/settings',
      method: 'GET',
      crossDomain: true,
      success: (data) => { this.settings = data; }
    });
  }
}

export interface Settings {
  day: string;
  stime: string;
  ftime: string;
  timeout: string;
}
