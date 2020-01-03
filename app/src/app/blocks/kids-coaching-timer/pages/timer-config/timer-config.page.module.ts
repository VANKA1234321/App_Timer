import { NgModule } from '@angular/core';
import { TimerConfigPage } from './timer-config.page';

@NgModule({
	declarations: [
		TimerConfigPage,
	],
	imports: [
		DaysSelectorModule,
		HoursSelectorModule,
		MinutesSelectorModule,
	],
	exports: [
		TimerConfigPage
	]
})
export class TimerConfigModule { }
