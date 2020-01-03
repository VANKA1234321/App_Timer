import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Insomnia } from '@ionic-native/insomnia';
import { Observable } from 'rxjs/Rx';
import { P2Page } from '../p2/p2';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  output: any;
  isPause: Boolean = false;
  time = 60;
  isStart: Boolean = false;
  isResume: Boolean = false;
  t: any;
  constructor(public navCtrl: NavController, private iso: Insomnia, private elementRef: ElementRef) {

  }


  startTimer() {
    this.isStart = true;

    // var timer = 60; //Second  ค่าเวลาเริ่มต้น
    var hours;
    var minutes;
    var seconds;

    //คำสั่งให้แอพของเรารันอยู่เบื้องหลัง หรือก็คือ ต่อให้ปิดแอพไป หรือเปลี่ยนไปหน้าอื่น ส่วนของการทำงานนี้ก็ยังจะทำงานปกติจนกว่าจะจบ
    // the command is declare application is running in background mode
    this.iso.keepAwake()
      .then(() => {
        //กำหนดให้ ว่า ต่อให้จะออกไปเข้าแอพอื่น หรือ เปลี่ยนไปหน้าอื่น นาฬิกาจะทำงานเรื่อยๆจนกว่าเวลาจะหมด
        this.t = setInterval(() => {
          if (!this.isPause) {
            var hours;
            var minutes;
            var seconds;
            hours = Math.floor(this.time / 3600);
            minutes = Math.floor(hours / 60);
            seconds = Math.floor(this.time % 60);
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            this.output = hours + ":" + minutes + ":" + seconds;
            this.time--;
            if (this.time === 0) {
              clearInterval(this.t);
            }
          }
        }, 1000);
      });
    console.log('start');
  }
  stopTimer() {
    this.isStart = true;
    this.isResume = true;
    this.isPause = true;
    console.log('stop');
  }
  resumeTimer() {
    this.isStart = true;
    this.isResume = false;
    this.isPause = false;
    console.log('resume');
  }
  goP2() {
    this.navCtrl.push(P2Page)
  }
}
