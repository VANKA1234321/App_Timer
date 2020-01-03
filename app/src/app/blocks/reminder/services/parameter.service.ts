import { Injectable } from '@angular/core';


export interface ReminderParameter {
	timerSpec: {};
	timerModel: string;
	timerId: string;
	zoneId: number;
	zones: number;
	ecoFunction: boolean;
	sensorFunction: boolean;
	weeklyDataId: number;
	cycleId: string;
}

@Injectable()
export class ReminderParameterService {

	parameter: ReminderParameter;

	constructor() {

	}
	store(parameter: ReminderParameter) {
		this.parameter = parameter;
	}
	retrieve() {
		return this.parameter;
	}
}
