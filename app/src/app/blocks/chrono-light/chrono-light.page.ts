import { Component, OnInit, OnDestroy } from '@angular/core';

import { Flashlight } from '@ionic-native/flashlight/ngx';

import { HelperService } from 'src/app/helpers/helper.service';

export interface CountdownTimer {
	seconds: number;
	secondsRemaining: number;
	runTimer: boolean;
	hasStarted: boolean;
	hasFinished: boolean;
	displayTime: string;
}

@Component({
	selector: 'app-chrono-light',
	templateUrl: './chrono-light.page.html',
	styleUrls: ['./chrono-light.page.scss'],
})
export class ChronoLightPage implements OnInit, OnDestroy {
	private helper = new HelperService('ChronoLightPage');

	timeInSeconds: number;

	hours = 0;
	minutes = 1;
	seconds = 0;

	public idOfSetTimeout;

	timer: CountdownTimer;

	constructor(private flashlight: Flashlight) {
		this.helper.log('constructor');
	}

	ngOnInit() {
		this.helper.log('ngOnInit');
	}

	init() {
		this.helper.log('init', 'hours=' + this.hours + ' minutes=' + this.minutes + 'seconds=' + this.seconds);

		this.timeInSeconds = this.hours * 3600 + this.minutes * 60 + 1 * this.seconds;
		this.helper.log('ngOnInit', 'Time in sec: ' + this.timeInSeconds);

		this.initTimer();

		this.flashlight.switchOn();

		this.idOfSetTimeout = setTimeout(() => {
			this.helper.log('ngOnInit', 'The lamp is going to be switch off the timer is finished');
			this.flashlight.switchOff();
		}, 1000 * this.timeInSeconds);

		this.startTimer();
	}

	hasFinished() {
		this.helper.log('init');
		return this.timer.hasFinished;
	}

	initTimer() {
		this.helper.log('init');

		if (!this.timeInSeconds) { this.timeInSeconds = 0; }

		this.timer = {
			seconds: this.timeInSeconds,
			runTimer: false,
			hasStarted: false,
			hasFinished: false,
			secondsRemaining: this.timeInSeconds
		} as CountdownTimer;

		this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
	}

	startTimer() {
		this.helper.log('startTimer');

		this.timer.hasStarted = true;
		this.timer.runTimer = true;
		this.timerTick();
	}

	pauseTimer() {
		this.helper.log('pauseTimer', ' Time in sec: ' + this.timer.secondsRemaining);
		this.flashlight.switchOff();
		this.timer.runTimer = false;
		this.timer.hasStarted = false;
		clearTimeout(this.idOfSetTimeout);
	}

	resumeTimer() {
		this.helper.log('resumeTimer');
		this.startTimer();
		if (this.timer.secondsRemaining !== 0) {
			this.flashlight.switchOn();
		}
		this.timer.hasStarted = true;
		this.timer.runTimer = true;
		this.helper.log('resumeTimer', 'Time in sec: ' + this.timer.secondsRemaining);

		this.idOfSetTimeout = setTimeout(() => {
			this.helper.log('resumeTimer', 'The lamp is going to be switch off the timer is finished');
			this.flashlight.switchOff();
		}, 1000 * this.timer.secondsRemaining);
	}

	timerTick() {
		this.helper.log('timerTick');

		setTimeout(() => {
			if (!this.timer.runTimer || this.timer.secondsRemaining === 0) { return; }
			this.timer.secondsRemaining--;
			this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
			if (this.timer.secondsRemaining > 0 && this.timer.runTimer) {
				this.helper.log('timerTick', 'run a timer tick in sec: ' + this.timer.secondsRemaining);
				this.timerTick();
			} else {
				this.timer.hasFinished = true;
			}
		}, 1000);
	}

	getSecondsAsDigitalClock(inputSeconds: number) {
		this.helper.log('getSecondsAsDigitalClock');

		const secNum = parseInt(inputSeconds.toString(), 10);
		const hours = Math.floor(secNum / 3600);
		const minutes = Math.floor((secNum - (hours * 3600)) / 60);
		const seconds = secNum - (hours * 3600) - (minutes * 60);

		let hoursString = '';
		let minutesString = '';
		let secondsString = '';

		hoursString = (hours < 10) ? '0' + hours : hours.toString();
		minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
		secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();

		const secondsAsDigitalClock = hoursString + ':' + minutesString + ':' + secondsString;
		this.helper.log('getSecondsAsDigitalClock', 'secondsAsDigitalClock = ' + secondsAsDigitalClock);

		return secondsAsDigitalClock;
	}

	ngOnDestroy() {
		this.helper.log('ngOnDestroy');

		this.timer.secondsRemaining = 0;
		this.helper.log('ngOnDestroy', 'Time in sec: ' + this.timer.secondsRemaining);

		this.flashlight.switchOff();
		clearTimeout(this.idOfSetTimeout);
	}
}
