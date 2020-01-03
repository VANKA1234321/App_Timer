import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
	selector: 'app-background',
	templateUrl: './background.page.html',
	styleUrls: ['./background.page.scss'],
})
export class BackgroundPage implements OnInit {

	output: any;
	isPause = false;
	time = 60;
	isStart = false;
	isResume = false;
	t: any;

	constructor(
		public navCtrl: NavController,
		private iso: Insomnia,
		private elementRef: ElementRef) {
	}


	ngOnInit() {
	}

	startTimer() {
		this.isStart = true;

		let hours;
		let minutes;
		let seconds;

		this.iso.keepAwake()
			.then(() => {
				this.t = setInterval(() => {
					if (!this.isPause) {

						hours = Math.floor(this.time / 3600);
						minutes = Math.floor(hours / 60);
						seconds = Math.floor(this.time % 60);
						hours = hours < 10 ? '0' + hours : hours;
						minutes = minutes < 10 ? '0' + minutes : minutes;
						seconds = seconds < 10 ? '0' + seconds : seconds;
						this.output = hours + ':' + minutes + ':' + seconds;
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
}
