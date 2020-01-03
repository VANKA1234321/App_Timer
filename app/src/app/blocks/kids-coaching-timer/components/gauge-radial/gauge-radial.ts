import { Component, Input } from '@angular/core';
import { enumTimerStatus } from '../../models/timer.model';

@Component({
	selector: 'app-gauge-radial',
	templateUrl: 'gauge-radial.html'
})
export class KCTGaugeRadialComponent {
	@Input() percentage = 0;

	iconName = 'pause';

	_state = 0;
	@Input() set state(value: number) {
		this._state = value;
		switch (this._state) {
			case enumTimerStatus.ACKNOWLEDGE:
				this.iconName = '';
				break;
			case enumTimerStatus.ALERT:
				this.iconName = 'pause';
				break;
			case enumTimerStatus.HOLD:
				this.iconName = 'play';
				break;
			case enumTimerStatus.OVER_1ST_TIME:
				this.iconName = 'close';
				break;
			case enumTimerStatus.OVER:
				this.iconName = 'close';
				break;
			case enumTimerStatus.READY:
				this.iconName = 'play';
				break;
			case enumTimerStatus.RUNNING:
				this.iconName = 'pause';
				break;
			default:
				this.iconName = '';
				break;
		}
	}

	constructor() { }
}
