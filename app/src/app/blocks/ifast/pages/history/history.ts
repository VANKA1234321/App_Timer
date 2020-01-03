import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  items : Array<string>;
  timer : number;

  constructor(private navCtrl : NavController, private navParams : NavParams, private storage : Storage) {
    this.getDataInterval();
  }

  getData() {
    this.items = navParams.get('data');
  }

  getDataInterval() {
    this.timer = setInterval(() => {
      this.getData();
    }, 1000);
  }

  itemSelected(item) {
    clearInterval(this.timer);
    var index = this.items.indexOf(item);
    if(index !== -1)
      this.items.splice(index, 1);
    this.storage.ready().then(() => {
      this.storage.set('items', JSON.stringify(this.items));
    });
    this.getDataInterval();
  }
}
