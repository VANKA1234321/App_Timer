import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	public appPages = [
		{ title: 'Home', url: '/home', icon: 'home' },
		{ title: 'List', url: '/list', icon: 'list' },
		{ title: 'alarm', url: '/alarm', icon: 'alarm' },
		{ title: 'background', url: '/background', icon: 'alarm' },
		{ title: 'basil', url: '/basil', icon: 'alarm' },
		{ title: 'chrono-light', url: '/chrono-light', icon: 'alarm' },
		{ title: 'fitness', url: '/fitness', icon: 'alarm' },
		{ title: 'kct', url: '/kct', icon: 'alarm' },
		{ title: 'notifiy', url: '/notifiy', icon: 'alarm' },
		{ title: 'play', url: '/play', icon: 'alarm' },
		{ title: 'reminder', url: '/reminder', icon: 'alarm' },
		{ title: 'rest-duration', url: '/rest-duration', icon: 'alarm' },
		{ title: 'stopwatch', url: '/stopwatch', icon: 'alarm' },
		{ title: 'tomatur', url: '/tomatur', icon: 'alarm' },
		{ title: 'i-fast', url: '/i-fast', icon: 'alarm' },
	];

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
