import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'page-manual',
	templateUrl: 'manual.html'
})

export class ReminderManualPage implements OnInit {

	timerId: string;
	zoneId = 1;

	currentIndex = 0;
	sliderMins = [];
	imgSrc = 'assets/img/water-drop-off_g.png';

	started = false;
	startTime: string;
	stoped = false;
	isWatering = false;
	timeRemain: number;
	showTime: string;


	waterForSelected = '5 Minutes';
	waterForList = [];

	mySlideOptions1 = {
		initialSlide: 0,
		direction: 'vertical',
		loop: false,
		speed: 10,
		freeMode: true,
		freeModeSticky: true,
		slidesPerView: 3,
		spaceBetween: 50,
		effect: 'coverflow',
		coverflow: {
			rotate: 0,
			stretch: 0,
			depth: 0,
			modifier: 1,
			slideShadows: false
		}
	};

	database: SQLite;
	weeklyDataList = [];

	// @ViewChild('mySlider1', { static: true }) slider1: Slides;

	constructor(
		public router: Router,
		private activatedRoute: ActivatedRoute,
		public toastController: ToastController) {
		this.timerId = this.activatedRoute.snapshot.paramMap.get('timerId');
		this.zoneId = Number(this.activatedRoute.snapshot.paramMap.get('zoneId'));
	}

	ngOnInit() {
		let j = 35;
		for (let i = 1; i <= 96; i++) {
			let unit = ' Minutes';
			if (i > 30) {
				this.waterForList.push({ item: j + unit });
				j += 5;
			} else {
				if (i === 1) {
					unit = ' Minute';
				}
				this.waterForList.push({ item: i + unit });
			}
		}

		if (this.isWatering === false && this.started === false && this.stoped === false) {
			this.showTime = this.secondsToHms(this.getMinutes(this.waterForSelected) * 60);
		}
	}


	selectedChanged() {
		if (this.isWatering === false && this.started === false && this.stoped === false) {
			this.showTime = this.secondsToHms(this.getMinutes(this.waterForSelected) * 60);
		}
	}

	startClicked() {
		this.isWatering = true;
		this.started = true;
		this.stoped = false;
		this.imgSrc = 'assets/img/water-drop-on.png';
		this.countdownStart(this.getMinutes(this.waterForSelected) * 60);
	}

	resumeClicked() {
		this.isWatering = true;
		this.stoped = false;
		this.imgSrc = 'assets/img/water-drop-on.png';
		this.countdownStart(this.timeRemain);
	}

	pauseClicked() {
		this.isWatering = false;
		this.stoped = true;
		this.imgSrc = 'assets/img/water-drop-off_g.png';
	}

	resetClicked() {
		this.isWatering = false;
		this.started = false;
		this.stoped = false;
		this.imgSrc = 'assets/img/water-drop-off_g.png';
		this.showTime = this.secondsToHms(this.getMinutes(this.waterForSelected) * 60);
	}

	countdownStart(duration: number) {
		if (this.started === true && this.stoped === false) {
			setTimeout(() => {
				duration--;
				if (duration > -1) {
					this.countdownStart(duration);
					this.timeRemain = duration;
				} else {
					this.isWatering = false;
					this.started = false;
					this.stoped = false;
					this.timeRemain = 0;
					duration = 0;
					this.imgSrc = 'assets/img/water-drop-off_g.png';
				}
			}, 1000);
		}
		if (duration === 0) {
			this.showTime = this.secondsToHms(this.getMinutes(this.waterForSelected) * 60);
		} else {
			this.showTime = this.secondsToHms(duration);
		}

	}

	async resentToast(msg) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 1500,
			position: 'top'
		});

		await toast.present();
	}

	onSlideChanged() {
		// console.log(this.slider1.getActiveIndex());
	}

	private getMinutes(str: string) {
		const parts = str.split(' ');

		const value = Number(parts[0]);
		const type = parts[1];

		let result = 0;
		if (type === 'Minutes') {
			result = value;
		} else if (type === 'Hours') {
			result = value * 60;
		} else {
			result = (value * 24) * 60;
		}
		return result;
	}

	private secondsToHms(d) {
		d = Number(d);
		const m = Math.floor(d / 60);
		const s = Math.floor(d % 3600 % 60);
		const mDisplay = m < 10 ? '0' + m.toString() : m.toString();
		const sDisplay = s < 10 ? '0' + s.toString() : s.toString();

		return mDisplay + ':' + sDisplay;
		// d = Number(d);
		// var h = Math.floor(d / 3600);
		// var m = Math.floor(d % 3600 / 60);
		// var s = Math.floor(d % 3600 % 60);

		// var hDisplay = h < 10 ? '0' + h.toString() : h.toString();
		// var mDisplay = m < 10 ? '0' + m.toString() : m.toString();
		// var sDisplay = s < 10 ? '0' + s.toString() : s.toString();
		// return hDisplay + ":" + mDisplay + ":" + sDisplay;
	}


}
