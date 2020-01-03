import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timerStarted : boolean;
  buttonColor : string;
  icon: string;
  timer : number;
  timeElapsed: string;
  start : Date;
  items : Array<string>;

  constructor(private navCtrl : NavController, private toastCtrl : ToastController, private storage : Storage, private navParams : NavParams) {
    this.storage.ready().then(() => {
      this.storage.get('timerStarted').then((value) => {
        this.timerStarted = value;
        this.buttonColor = 'danger';
        this.icon = 'square';
      })
      .catch(function(reject) {
        this.timerStarted = false;
        this.buttonColor = 'primary';
        this.icon = 'play';
        this.timeElapsed = "00:00:00";
        this.storage.set('timerStarted', false);
      });

      this.storage.get('start').then((value) => {
        this.start = new Date(JSON.parse(value));
        this.startTimer(false);
      })
      .catch(function(reject) {
        this.stopTimer(false);
        this.start = null;
      });

      this.storage.get('items').then((value) => {
        this.items = JSON.parse(value);
      })
      .catch(function(reject) {
        this.items = [];
      });
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });

    toast.present();
  }

  setTimerText() {
    if(this.start === null) {
      this.timeElapsed = "00:00:00";
      return;
    }

    let now   = new Date();
    let diff  = now.getTime() - this.start.getTime();

    if(diff <= 0)
      clearInterval(this.timer);
    else {
      let seconds = Math.floor(diff / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours   = Math.floor(minutes / 60);

      minutes %= 60;
      seconds %= 60;

      let secondsString = seconds.toString();
      let minutesString = minutes.toString();
      let hoursString   = hours.toString();

      if(secondsString.length < 2)
        for(let i = 0; i < 2 - secondsString.length; ++i)
          secondsString = '0' + secondsString;

      if(minutesString.length < 2)
        for(let i = 0; i < 2 - minutesString.length; ++i)
          minutesString = '0' + minutesString;

      if(hoursString.length < 2)
        for(let i = 0; i < 2 - hoursString.length; ++i)
          hoursString = '0' + hoursString;

      this.timeElapsed = hoursString + ':' + minutesString + ':' + secondsString;
    }
  }

  startTimer(showToast=true) {
    this.storage.ready().then(() => {
      this.storage.get('items').then((value) => {
        this.items = JSON.parse(value);
      })
      .catch(function(reject) {
        this.items = [];
      });
    });

    this.timer = setInterval(() => {
      this.setTimerText();
    }, 1000);

    this.timerStarted = true;
    this.buttonColor = 'danger';
    this.icon = 'square';

    this.storage.ready().then(() => {
      this.storage.set('timerStarted', this.timerStarted);
      this.storage.set('start', JSON.stringify(this.start));
    });

    if(showToast)
      this.showToast('You have started a fast, good luck!');
  }

  stopTimer(showToast=true) {
    clearInterval(this.timer);

    this.start = null;

    this.items.unshift(this.timeElapsed);

    this.navCtrl.push(HistoryPage, {
      data: this.items
    });

    this.timerStarted = false;
    this.buttonColor = 'primary';
    this.icon = 'play';

    this.storage.ready().then(() => {
      this.storage.set('items', JSON.stringify(this.items));
      this.storage.set('timerStarted', this.timerStarted);
    });

    this.timeElapsed = '00:00:00';

    if(showToast)
      this.showToast('You have ended a fast.');
  }

  buttonClick() {
    if(this.timerStarted)
      this.stopTimer();
    else {
      this.start = new Date();
      this.startTimer();
    }
  }
}
