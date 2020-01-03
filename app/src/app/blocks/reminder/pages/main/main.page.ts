import { Component, OnInit } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { ReminderDetailsPage } from '../detail/details.page';
import { NavController, NavParams, Platform, ModalController, AlertController, ToastController } from '@ionic/angular';
import { ReminderParameterService, ReminderParameter } from '../../services/parameter.service';

@Component({
	selector: 'app-reminder-main',
	templateUrl: 'main.page.html'
})

export class ReminderMainPage implements OnInit {
	timerSpec: {};
	timerModel: string;
	timerId: string;
	zoneId: number;

	ecoFunction: boolean;
	sensorFunction: boolean;

	function = 'cycle';
	startTime = '1980-11-06T00:00:00.000Z';
	cycleBtnColor = 'primary';
	weeklyBtnColor = 'secondary';
	weeklyToolbarHide = true;
	hideMainDeleteBtn = true;
	hideMinorDeleteBtn = true;

	isEnable = false;
	waterForSelected = '5 Minutes';
	waterEverySelected = '4 Hours';
	waterForList = [];
	watereEeryList = [{ item: '4 Hours' }, { item: '6 Hours' }, { item: '8 Hours' },
	{ item: '12 Hours' }, { item: '1 Day' }, { item: '2 Days' }, { item: '3 Days' },
	{ item: '4 Days' }, { item: '5 Days' }, { item: '6 Days' }, { item: '7 Days' }];

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
	// sensorMoistList = [{ item: 'DRY' }, { item: 'MOIST' }, { item: 'MEDIUM' },
	//     { item: 'WET' }, { item: 'WETTEST' }];

	database: SQLiteObject;

	weeklyDataList = [];

	constructor(
		public navCtrl: NavController,
		public params: NavParams,
		public platform: Platform,
		public modalController: ModalController,
		public alertController: AlertController,
		public toastController: ToastController,
		private sqlite: SQLite,
		private parameterService: ReminderParameterService) {

		this.timerSpec = params.get('timerSpec');
		this.timerModel = params.get('timerSpec').timerModel;
		this.timerId = params.get('timerId');
		this.zoneId = params.get('zoneId');
		this.ecoFunction = params.get('timerSpec').ecoFunction;
		this.sensorFunction = params.get('timerSpec').sensorFunction;

		this.sqlite
			.create({ name: 'bleDB.db', location: 'default' })
			.then((db: SQLiteObject) => {
				this.database = db;
				this.getCycleData();
			})
			.catch(e => console.log(e));
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

	// nav to weekly detail page
	async goToProgramDetailClick() {
		this.parameterService.store({ timerSpec: this.timerSpec, timerId: this.timerId, zoneId: this.zoneId, weeklyDataId: -1 } as ReminderParameter);

		const modal = await this.modalController.create({ component: ReminderDetailsPage, });

		//
		const { data } = await modal.onWillDismiss();

		this.function = 'weekly';
		this.zoneId = data.zoneId;
		this.getWeeklyData();

		return await modal.present();
	}

	async editWeeklyClicked(weeklyData) {
		const parameter = { timerSpec: this.timerSpec, timerId: this.timerId, zoneId: this.zoneId, weeklyDataId: weeklyData.id, cycleId: weeklyData.cycleId } as ReminderParameter;

		const modal = await this.modalController.create({ component: ReminderDetailsPage, });

		const { data } = await modal.onDidDismiss();
		this.function = 'weekly';
		this.zoneId = data.zoneId;
		this.getWeeklyData();

		return await modal.present();
	}

	functionBtnClicked(currentFuction) {
		switch (currentFuction) {
			case 1:
				this.function = 'cycle';
				this.cycleBtnColor = 'primary';
				this.weeklyBtnColor = 'secondary';
				this.weeklyToolbarHide = true;
				this.getCycleData();
				break;
			case 2:
				this.function = 'weekly';
				this.cycleBtnColor = 'secondary';
				this.weeklyBtnColor = 'primary';
				this.weeklyToolbarHide = false;
				this.getWeeklyData();
				break;
		}
	}

	saveClicked() {
		const waterFor = this.getMinutes(this.waterForSelected);
		const waterEvery = this.getMinutes(this.waterEverySelected);
		const ecoWaterFor = this.getMinutes(this.ecoWaterForSelected);
		const ecoPause = this.getMinutes(this.ecoPauseSelected);

		this.database.executeSql('SELECT * FROM cycleSchedule WHERE TimerId = \'' + this.timerId + '\' and ZoneId = \'' + this.zoneId + '\'', []).then((data) => {
			if (data.rows.length > 0) {
				this.database
					.executeSql('UPDATE cycleSchedule SET StartTime = \'' + this.startTime + '\', ' +
						'WaterFor = \'' + waterFor + '\', ' +
						'WaterEvery = \'' + waterEvery + '\', ' +
						'IsEnable = \'' + this.isEnable + '\', ' +
						'EcoWaterFor = \'' + ecoWaterFor + '\', ' +
						'EcoPause = \'' + ecoPause + '\', ' +
						'EcoIsEnable = \'' + this.ecoIsEnable + '\', ' +
						'Moist = \'' + this.moistSelected + '\' ' +
						'WHERE TimerId = \'' + this.timerId + '\' and ZoneId = \'' + this.zoneId + '\'', [])
					.then((result) => {
						// console.log("UPDATED: " + JSON.stringify(result));
						this.presentToast('Schedule saved');
					}, (error) => {
						// console.log("ERROR: " + JSON.stringify(error));
					});
			} else {
				this.database
					.executeSql('INSERT INTO cycleSchedule (TimerId, ZoneId, StartTime, WaterFor, WaterEvery, IsEnable, EcoWaterFor, EcoPause, EcoIsEnable, Moist) ' +
						'VALUES (\'' + this.timerId + '\', \'' + this.zoneId + '\', \'' + this.startTime + '\', \'' + waterFor +
						'\', \'' + waterEvery + '\', \'' + this.isEnable + '\', \'' + ecoWaterFor + '\', \'' + ecoPause + '\', \'' + this.ecoIsEnable + '\', \'' + this.moistSelected + '\')', [])
					.then((result) => {
						// console.log('INSERTED: ' + JSON.stringify(result));
						this.presentToast('Schedule saved');
					}, (error) => {
						// console.log('ERROR: ' + JSON.stringify(error));
					});
			}
		});
	}

	showDeleteClicked() {
		this.hideMinorDeleteBtn = !this.hideMinorDeleteBtn;
	}

	updateWeeklyIsEnable(weeklyData) {
		console.log(weeklyData.waterDay);
		if (weeklyData.waterDay === '') {
			this.editWeeklyClicked(weeklyData);
		} else {
			this.database.executeSql('UPDATE weeklySchedule set IsEnable = \'' + weeklyData.isEnable +
				'\' WHERE id = \'' + weeklyData.id + '\'', []).then((data) => {
					if (weeklyData.isEnable === true) {
						this.presentToast('Program On');
					} else {
						this.presentToast('Program Off');
					}
					// console.log("update weekly isenable : " + JSON.stringify(data));
				}, (error) => {
					// console.log("ERROR(weekly): " + JSON.stringify(error));
				});
		}
	}

	deleteWeeklyClicked(weeklyData) {
		console.log(weeklyData);
		this.database.executeSql('DELETE FROM weeklySchedule WHERE id = \'' + weeklyData.id + '\'', []).then((data) => {
			// console.log("Weekly Schedule deleted: " + JSON.stringify(data));
			this.presentToast('Schedule deleted');
			this.getWeeklyData();
		}, (error) => {
			// console.log("ERROR: " + JSON.stringify(error.err));
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

	private getCycleData() {
		this.database.executeSql('SELECT * FROM cycleSchedule ' +
			'WHERE TimerId = \'' + this.timerId + '\' and ZoneId = \'' + this.zoneId + '\'', []).then((data) => {
				if (data.rows.length > 0) {
					this.startTime = data.rows.item(0).StartTime;
					this.isEnable = data.rows.item(0).IsEnable;
					this.waterForSelected = data.rows.item(0).WaterFor + ' Minutes';
					this.waterEverySelected = this.getWaterEvery(data.rows.item(0).WaterEvery);
					this.ecoIsEnable = data.rows.item(0).EcoIsEnable;
					this.ecoWaterForSelected = data.rows.item(0).EcoWaterFor + ' Minutes';
					this.ecoPauseSelected = data.rows.item(0).EcoPause + ' Minutes';
					this.moistSelected = data.rows.item(0).Moist;
				} else {
					this.startTime = '1980-11-06T00:00:00.000Z';
					this.isEnable = false;
					this.waterForSelected = '5 Minutes';
					this.waterEverySelected = '4 Hours';
					this.ecoIsEnable = false;
					this.ecoWaterForSelected = '3 Minutes';
					this.ecoPauseSelected = '3 Minutes';
					this.moistSelected = 3;
				}
				// console.log("Load Cycle Data: " + JSON.stringify(data));
			}, (error) => {
				// console.log("ERROR(cycle): " + JSON.stringify(error));
			});
	}

	private getWeeklyData() {
		this.database.executeSql('SELECT * FROM weeklySchedule ' +
			'WHERE TimerId = \'' + this.timerId + '\' and ZoneId = \'' + this.zoneId + '\'', []).then((data) => {
				this.weeklyDataList = [];
				// if is LCD model, include cycleList
				const cycleList = ['A', 'B', 'C', 'D'];
				if (data.rows.length > 0) {
					for (let i = 0; i < data.rows.length; i++) {
						this.weeklyDataList.push({
							id: data.rows.item(i).id,
							startTime: this.formatTime(data.rows.item(i).StartTime),
							isEnable: data.rows.item(i).IsEnable,
							waterFor: data.rows.item(i).WaterFor + ' Minutes',
							waterDay: this.getWaterDays(data.rows.item(i).WaterDay),
							ecoIsEnable: data.rows.item(i).EcoIsEnale,
							ecoWaterFor: data.rows.item(i).EcoWaterFor + ' Minutes',
							ecoPause: data.rows.item(i).EcoPause + ' Minutes',
							moist: data.rows.item(i).Moist,
							cycleId: this.ecoFunction === true ? '' : cycleList[i]
						});
					}
					this.hideMainDeleteBtn = false;
				} else {
					this.hideMainDeleteBtn = true;
					// insert new data if db is null
					if (this.ecoFunction !== true) {
						this.initialWeeklyData();
					}
				}
				// console.log("Load Weekly Data: " + JSON.stringify(data));
			}, (error) => {
				// console.log("ERROR(weekly): " + JSON.stringify(error));
			});
		this.hideMinorDeleteBtn = true;
	}

	// this is for the ble lcd moduel water timer
	private initialWeeklyData() {
		for (let i = 0; i <= 3; i++) {
			const startTime = '1980-11-06T00:00:00.000Z';
			const waterFor = 5;
			const weekdaySelected = '';
			const ecoWaterFor = 3;
			const ecoPause = 3;
			const moist = 'MEDIUM';

			this.database.executeSql('INSERT INTO weeklySchedule (TimerId, ZoneId, StartTime, WaterFor, WaterDay, IsEnable, EcoWaterFor, EcoPause, EcoIsEnable, Moist) ' +
				'VALUES (\'' + this.timerId + '\', \'' + this.zoneId + '\', \'' + startTime + '\', \'' + waterFor +
				'\', \'' + weekdaySelected + '\', 0, \'' + ecoWaterFor + '\', \'' + ecoPause + '\', 0, \'' + moist + '\')', []).then((data) => {
					// console.log('INSERTED: ' + JSON.stringify(data));
				}, (error) => {
					// console.log('ERROR: ' + JSON.stringify(error));
				});
		}
		this.getWeeklyData();
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

	private getWaterEvery(int: number) {
		const hours = int / 60;
		let result: string;
		return result = hours <= 12 ? hours + ' Hours' : hours / 24 === 1 ? hours / 24 + ' Day' : hours / 24 + ' Days';
	}

	private getWaterDays(str: string) {
		let weekString = '';
		let count = 0;
		if (str !== '') {
			const days = [{ item: 'SU' }, { item: 'MO' }, { item: 'TU' },
			{ item: 'WE' }, { item: 'TH' }, { item: 'FR' }, { item: 'SA' }];

			for (let i = 0; i < 7; i++) {
				if (str.indexOf(i.toString()) >= 0) {
					weekString += days[i].item;
					count++;
					if (count < str.length && weekString !== '') {
						weekString += ',';
					}
				}
			}
		}
		return weekString;
	}

	private formatTime(time) {
		let hours = time.substring(11, 13);
		const minutes = time.substring(14, 16);
		const ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12;
		const strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

	private async presentAlert(message) {
		const alert = await this.alertController.create({
			header: 'Alert',
			subHeader: '',
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

	private async presentToast(msg) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 1500,
			position: 'top'
		});

		await toast.present();
	}
}
