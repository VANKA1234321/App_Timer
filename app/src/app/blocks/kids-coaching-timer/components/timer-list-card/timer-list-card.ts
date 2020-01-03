import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { KCTUITimer } from '../../models/uitimer.model';

@Component({
	selector: 'app-timer-list-card',
	templateUrl: 'timer-list-card.html'
})

export class KCTTimerListCardComponent {

	thisTimer: KCTUITimer;
	@Input()
	set timer(value: KCTUITimer) {
		this.thisTimer = value;
	}

	percentage = 30;
	pause = false;

	@Output() rewardClicked: EventEmitter<number> = new EventEmitter();
	@Output() settingClicked: EventEmitter<KCTUITimer> = new EventEmitter();
	@Output() penaltyClicked: EventEmitter<number> = new EventEmitter();
	@Output() clicked: EventEmitter<KCTUITimer> = new EventEmitter();

	constructor(
		private actionSheetController: ActionSheetController,
	) { }

	raiseSetting() {
		this.settingClicked.emit(this.thisTimer);
	}

	raiseClick() {
		this.clicked.emit(this.thisTimer);
	}
	raiseReward(value: number) {
		this.rewardClicked.emit(value);
	}

	async showRewardSelection() {
		const actionSheet = await this.actionSheetController.create({
			header: 'select reward',
			buttons: [
				{
					text: '+5 min', handler: () => { this.raiseReward(5); }
				},
				{
					text: '+10 min', handler: () => { this.raiseReward(10); }
				},
				{
					text: '+15 min', handler: () => { this.raiseReward(15); }
				},
				{
					text: '+30 min', handler: () => { this.raiseReward(30); }
				},
				{ text: '+45 min', handler: () => { this.raiseReward(45); } }
			]
		});
		actionSheet.present();
	}

	raisePenalty(value: number) {
		this.penaltyClicked.emit(value);
	}

	async showPenaltySelection() {
		const actionSheet = await this.actionSheetController.create({
			header: 'select penalty',
			buttons: [
				{
					text: '-5 min',
					handler: () => {
						this.raisePenalty(5);
					}
				}, {
					text: '-10 min',
					handler: () => {
						this.raisePenalty(10);
					}
				}, {
					text: '-15 min',
					handler: () => {
						this.raisePenalty(15);
					}
				}, {
					text: '-30 min',
					handler: () => {
						this.raisePenalty(30);
					}
				}, {
					text: '-45 min',
					handler: () => {
						this.raisePenalty(45);
					}
				}
			]
		});

		await actionSheet.present();
	}

}
