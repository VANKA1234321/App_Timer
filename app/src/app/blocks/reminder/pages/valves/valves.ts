import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ReminderParameterService, ReminderParameter } from '../../services/parameter.service';

@Component({
	selector: 'page-valves',
	templateUrl: 'valves.html'
})
export class ValvesPage implements OnInit {
	timerSpec: {};
	timerModel: string;
	timerId: string;
	zones: number;
	zoneSelected: number;
	public base64Image = 'assets/img/camera.png';
	zoneList = [];

	constructor(
		private router: Router,
		private activatedroute: ActivatedRoute,
		private platform: Platform,
		private camera: Camera,
		private parameterService: ReminderParameterService) {

		const parameter = parameterService.retrieve();
		this.timerSpec = parameter.timerSpec;
		this.timerModel = parameter.timerModel;
		this.timerId = parameter.timerId;
		this.zones = parameter.zones;
	}

	ngOnInit() {
		// todo, load zones from db
		for (let i = 1; i <= this.zones; i++) {
			this.zoneList.push({ id: i, Image: this.base64Image });
		}
	}

	goToTabs(zoneId) {
		this.zoneSelected = zoneId;

		const parameter = {
			timerSpec: this.timerSpec,
			timerId: this.timerId,
			zoneId: this.zoneSelected
		} as ReminderParameter;

		this.router.navigateByUrl('/reminder/main');
	}

	public takePicture(zone) {

		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
			targetWidth: 180,
			targetHeight: 120,
			saveToPhotoAlbum: false
		};

		if (this.platform.is('ios')) {
			this.camera.getPicture(options).then(imageData => {
				this.base64Image = 'data:image/jpeg;base64,' + imageData;
				zone.Image = this.base64Image;
			}, error => {
				console.log('ERROR -> ' + JSON.stringify(error));
			});
		} else if (this.platform.is('android')) {
			this.camera.getPicture(options).then(imageData => {
				this.base64Image = 'data:image/jpeg;base64,' + imageData;
				zone.Image = this.base64Image;
			}, error => {
				console.log('ERROR -> ' + JSON.stringify(error));
			});
		}
	}
}
