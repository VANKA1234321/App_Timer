import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { ReminderParameter, ReminderParameterService } from '../../services/parameter.service';

@Component({
	selector: 'app-reminder-details',
	templateUrl: 'details.page.html'
})
export class ReminderDetailsPage implements OnInit {
	timerSpec: {};
	timerModel: string;
	timerId: string;
	zoneId: number;
	ecoFunction: boolean;
	sensorFunction: boolean;
	weeklyDataId: number;
	cycleId: string;
	startTime = '1980-11-06T00:00:00.000Z';
	weekdaySelected = '';


	waterForSelected = '5 Minutes';
	waterForList = [];

	ecoIsEnable = false;
	ecoWaterForSelected = '3 Minutes';
	ecoPauseSelected = '3 Minutes';
	ecoWaterForList = [];
	ecoPauseList = [];

	moistSelected = 3;
	sensorMoistList = [
		{ id: 0, isEnable: true, img: 'assets/img/most-on-1.png' },
		{ id: 1, isEnable: true, img: 'assets/img/most-on-2.png' },
		{ id: 2, isEnable: true, img: 'assets/img/most-on-3.png' },
		{ id: 3, isEnable: false, img: 'assets/img/most-off-4.png' },
		{ id: 4, isEnable: false, img: 'assets/img/most-off-5.png' }
	];

	weekdays = [
		{ id: 0, isEnable: false, color: 'secondary', img: 'assets/img/water-drop-off0_g.png' },
		{ id: 1, isEnable: false, color: 'secondary', img: 'assets/img/water-drop-off1_g.png' },
		{ id: 2, isEnable: false, color: 'secondary', img: 'assets/img/water-drop-off2_g.png' },
		{ id: 3, isEnable: false, color: 'secondary', img: 'assets/img/water-drop-off3_g.png' },
		{ id: 4, isEnable: false, color: 'secondary', img: 'assets/img/water-drop-off4_g.png' },
		{ id: 5, isEnable: false, color: 'secondary', img: 'assets/img/water-drop-off5_g.png' },
		{ id: 6, isEnable: false, color: 'secondary', img: 'assets/img/water-drop-off6_g.png' }
	];

	database: SQLiteObject;
	parameter: ReminderParameter;

	constructor(
		public router: Router,
		public activatedRoute: ActivatedRoute,
		public platform: Platform,
		private sqlite: SQLite,
		public alertController: AlertController,
		public toastController: ToastController,
		private parameterService: ReminderParameterService) {
		//

		this.parameter = this.parameterService.retrieve();

		this.timerSpec = this.parameter.timerSpec;
		this.timerModel = this.parameter.timerModel;
		this.timerId = this.parameter.timerId;
		this.zoneId = this.parameter.zoneId;
		this.ecoFunction = this.parameter.ecoFunction;
		this.sensorFunction = this.parameter.sensorFunction;

		this.weeklyDataId = this.parameter.weeklyDataId;
		this.cycleId = this.ecoFunction === true ? '' : ', Cycle ' + this.parameter.cycleId;

		//
		platform.ready().then(() => {
			this.sqlite
				.create({ name: 'bleDB.db', location: 'default' })
				.then((db: SQLiteObject) => {
					this.database = db;

					if (this.weeklyDataId !== -1) {
						this.loadWeeklyData();
					}
				})
				.catch(e => console.log(e));
		});
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

		for (let i = 3; i <= 30; i++) {
			this.ecoWaterForList.push({ item: i + ' Minutes' });
		}

		for (let i = 3; i <= 30; i++) {
			this.ecoPauseList.push({ item: i + ' Minutes' });
		}
	}

	weekdayBtnClicked(currentDay) {
		this.weekdays.forEach(element => {
			if (element.id === currentDay) {
				if (element.isEnable === true) {
					element.isEnable = false;
					element.img = 'assets/img/water-drop-off' + currentDay + '_g.png';
				} else {
					element.isEnable = true;
					element.img = 'assets/img/water-drop-on' + currentDay + '.png';
				}
			}
		});
	}

	mostBtnClicked(moist) {
		this.sensorMoistList.forEach(element => {
			this.moistSelected = moist;
			if (element.id <= moist) {
				element.isEnable = true;
				element.img = 'assets/img/most-on-' + (element.id + 1) + '.png';
			} else {
				element.isEnable = false;
				element.img = 'assets/img/most-off-' + (element.id + 1) + '.png';
			}
		});
	}

	cancelClicked() {
		const data = { zoneId: this.zoneId };
		// this.viewCtrl.dismiss(data);
	}

	saveClicked() {
		const waterFor = this.getMinutes(this.waterForSelected);
		const ecoWaterFor = this.getMinutes(this.ecoWaterForSelected);
		const ecoPause = this.getMinutes(this.ecoPauseSelected);

		this.weekdays.forEach(element => {
			if (element.isEnable === true) {
				this.weekdaySelected += element.id.toString();
			}
		});

		if (this.weekdaySelected !== '') {
			this.database.executeSql('SELECT * FROM weeklySchedule WHERE TimerId = \'' + this.timerId + '\' and ZoneId = \'' + this.zoneId + '\' and id = \'' + this.weeklyDataId + '\'', []).then((data) => {
				if (data.rows.length > 0) {
					this.database
						.executeSql('UPDATE weeklySchedule SET StartTime = \'' + this.startTime + '\', ' +
							'WaterFor = \'' + waterFor + '\', ' +
							'WaterDay = \'' + this.weekdaySelected + '\', ' +
							'IsEnable = \'1\', ' +
							'EcoWaterFor = \'' + ecoWaterFor + '\', ' +
							'EcoPause = \'' + ecoPause + '\', ' +
							'EcoIsEnable = \'' + this.ecoIsEnable + '\', ' +
							'Moist = \'' + this.moistSelected + '\' ' +
							'WHERE TimerId = \'' + this.timerId + '\' and ZoneId = \'' + this.zoneId + '\' and id =\'' + this.weeklyDataId + '\'', [])
						.then((result) => {
							console.log('UPDATED: ' + JSON.stringify(result));
							this.presentToast('Schedule saved');

							// @TODO: this.viewCtrl.dismiss({ 'zoneId': this.zoneId });
						}, (error) => {
							console.log('ERROR: ' + JSON.stringify(error));
						});
				} else {
					this.database
						.executeSql('INSERT INTO weeklySchedule (TimerId, ZoneId, StartTime, WaterFor, WaterDay, IsEnable, EcoWaterFor, EcoPause, EcoIsEnable, Moist) ' +
							'VALUES (\'' + this.timerId + '\', \'' + this.zoneId + '\', \'' + this.startTime + '\', \'' + waterFor +
							'\', \'' + this.weekdaySelected + '\', 1, \'' + ecoWaterFor + '\', \'' + ecoPause + '\', \'' + this.ecoIsEnable + '\', \'' + this.moistSelected + '\')', [])
						.then((result) => {
							console.log('INSERTED: ' + JSON.stringify(result));
							this.presentToast('Schedule saved');

							//
							// @TODO: this.viewCtrl.dismiss({ 'zoneId': this.zoneId });
						}, (error) => {
							console.log('ERROR: ' + JSON.stringify(error));
						});
				}
			});
		} else {
			this.presentAlert('Missing Value', 'Please select at least one weekday.');
		}
	}

	private loadWeeklyData() {
		this.database.executeSql('SELECT * FROM weeklySchedule ' +
			'WHERE TimerId = \'' + this.timerId + '\' and ZoneId = \'' + this.zoneId + '\' and id = \'' + this.weeklyDataId + '\'', []).then((data) => {
				if (data.rows.length > 0) {
					this.startTime = data.rows.item(0).StartTime;
					this.waterForSelected = data.rows.item(0).WaterFor + ' Minutes';
					this.ecoIsEnable = data.rows.item(0).EcoIsEnable;
					this.ecoWaterForSelected = data.rows.item(0).EcoWaterFor + ' Minutes';
					this.ecoPauseSelected = data.rows.item(0).EcoPause + ' Minutes';
					this.moistSelected = data.rows.item(0).Moist;

					const days = data.rows.item(0).WaterDay.split('');

					for (const day of days) {
						this.weekdayBtnClicked(day);
					}
				}
				// console.log("Load Weekly Data: " + JSON.stringify(data));
			}, (error) => {
				// console.log("ERROR(weekly): " + JSON.stringify(error));
			});

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

	async presentAlert(subheader: string, message: string) {
		const alert = await this.alertController.create({
			header: 'Alert',
			subHeader: subheader,
			message,
			buttons: ['OK']
		});

		await alert.present();
	}


	async presentToast(message) {
		const toast = await this.toastController.create({
			header: '',
			message,
			position: 'top',
			buttons: [
				{
					side: 'start', icon: 'star', text: 'Favorite',
					handler: () => {
						console.log('Favorite clicked');
					}
				}, {
					text: 'Done', role: 'cancel', handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		toast.present();
	}
}
