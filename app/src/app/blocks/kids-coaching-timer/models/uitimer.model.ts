import { Duration } from 'moment';

import { enumTimerStatus } from './timer.model';

export interface KCTUITimer {
	durationHumanized: string;
	durationLeft: Duration;
	percentageDone: number;
	durationLeftString: string;
	weekDaysHumanized: string[];
	guid: string;
	icon: string;
	title: string;
	status: enumTimerStatus;
	ready: boolean;
	hold: boolean;
	running: boolean;
	alert: boolean;
	over: boolean;
	done: boolean;
}
