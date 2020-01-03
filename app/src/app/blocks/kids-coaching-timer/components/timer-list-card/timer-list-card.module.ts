import { NgModule } from '@angular/core';
import { KCTTimerListCardComponent } from './timer-list-card';

@NgModule({
	declarations: [
		KCTTimerListCardComponent,
	],
	imports: [

		KCTGaugeRadialModule,
	],
	exports: [
		KCTTimerListCardComponent
	]
})
export class KCTTimerListCardComponentModule { }
