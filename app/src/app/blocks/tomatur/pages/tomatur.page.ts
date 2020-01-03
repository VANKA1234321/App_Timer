import { Component, OnInit } from '@angular/core';

import { Vibration } from '@ionic-native/vibration/ngx';
import { interval } from 'rxjs';

@Component({
	selector: 'app-tomatur',
	templateUrl: './tomatur.page.html',
	styleUrls: ['./tomatur.page.scss'],
})
export class TomaturPage implements OnInit {

	private pause = false;
	private round = 1;
	private count = 0;
	private minutes = 0;
	private seconds = 0;

	constructor(private vibration: Vibration) { }

	ngOnInit() {
		this.vibration.vibrate(1000);
		const timer = interval(1000).subscribe(x => {
			this.count++;

			this.minutes = Math.floor((1500 - this.count) % 3600 / 60);
			this.seconds = Math.floor((1500 - this.count) % 3600 % 60);

			if (!this.pause) {
				if (this.count === 1500) {
					this.pause = true;
					this.count = 0;
					this.vibration.vibrate(1000);
				}
			}
			if (this.pause) {
				if (this.round % 4 === 0) {
					this.minutes = Math.floor((900 - this.count) % 3600 / 60);
					this.seconds = Math.floor((900 - this.count) % 3600 % 60);

					if (this.count === 900) {
						this.round++;
						this.count = 0;
						this.pause = false;
						this.vibration.vibrate(1000);
					}
				} else {
					this.minutes = Math.floor((300 - this.count) % 3600 / 60);
					this.seconds = Math.floor((300 - this.count) % 3600 % 60);

					if (this.count === 300) {
						this.round++;
						this.count = 0;
						this.pause = false;
						this.vibration.vibrate(1000);
					}
				}
			}
		});
	}
}
