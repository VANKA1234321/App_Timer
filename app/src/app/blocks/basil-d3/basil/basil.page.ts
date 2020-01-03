import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-basil',
	templateUrl: './basil.page.html',
	styleUrls: ['./basil.page.scss'],
})
export class BasilPage implements OnInit {
	// variables for micTimer component
	ringTimerAction: string;
	micStatus: string;

	warmUpFor = 5000;
	countdownFor = 20000;
	warningFor = 1000;

	startMicTimerBtnDisabled = false;
	pauseMicTimerBtnDisabled = true;
	stopMicTimerBtnDisabled = true;

	// Variables of Disabling Buttons
	warmupUpBtnDisabled = false;
	countdownUpBtnDisabled = false;
	warningUpBtnDisabled = false;
	warmupDownBtnDisabled = false;
	countdownDownBtnDisabled = false;
	warningDownBtnDisabled = false;


	constructor() { }

	ngOnInit() {
	}

	disableControlBtns(disabled) {
		this.warmupUpBtnDisabled = disabled;
		this.countdownUpBtnDisabled = disabled;
		this.warningUpBtnDisabled = disabled;

		this.warmupDownBtnDisabled = disabled;
		this.countdownDownBtnDisabled = disabled;
		this.warningDownBtnDisabled = disabled;
	}

	onStartMicTimer() {
		this.ringTimerAction = 'start';
		this.micStatus = 'recording';
		this.startMicTimerBtnDisabled = true;
		this.pauseMicTimerBtnDisabled = false;
		this.stopMicTimerBtnDisabled = false;
		this.disableControlBtns(true);
	}

	onPauseMicTimer() {
		if (this.micStatus !== 'paused') {
			this.ringTimerAction = 'pause';
			this.micStatus = 'paused';
		} else {
			this.ringTimerAction = 'unPause';
			this.micStatus = 'recording';
		}
	}

	onStopMicTimer() {
		this.ringTimerAction = 'stop';
		this.micStatus = 'stopped';

		this.startMicTimerBtnDisabled = false;
		this.pauseMicTimerBtnDisabled = true;
		this.stopMicTimerBtnDisabled = true;
		this.disableControlBtns(false);
	}

	onFinished() {
		console.log('in home.ts=>onFinished');
		this.ringTimerAction = 'stopped';
		this.micStatus = 'stopped';
		this.startMicTimerBtnDisabled = false;
		this.pauseMicTimerBtnDisabled = true;
		this.stopMicTimerBtnDisabled = true;
		this.disableControlBtns(false);
		console.log('in home.ts=>onFinished');
	}

	onWarmupUp() {
		console.log('onWarmupUp');
		this.warmUpFor += 1000;
		console.log(this.warmUpFor);
	}
	onWarmupDown() {
		this.warmUpFor -= 1000;
		this.warmUpFor = Math.max(this.warmUpFor, 0);
	}

	onCountdownUp() {
		this.countdownFor += 1000;
	}
	onCountdownDown() {
		this.countdownFor -= 1000;
		this.countdownFor = Math.max(this.countdownFor, 2000);
	}

	onWarningUp() {
		this.warningFor += 1000;
	}
	onWarningDown() {
		this.warningFor -= 1000;
		this.warningFor = Math.max(this.warningFor, 0);
	}
}
