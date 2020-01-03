import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  copyright : string;

  constructor(public navCtrl: NavController) {
    this.copyright = '©' + (new Date().getFullYear()).toString() + ' Kevin Trinh. All rights reserved.';
  }

}
