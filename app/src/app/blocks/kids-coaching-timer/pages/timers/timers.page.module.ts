import { NgModule } from '@angular/core';
import { TimersPage } from './timers.page';
import { TimerListCardModule } from '../../components/timer-list-card/timer-list-card.module';

@NgModule({
	declarations: [
		TimersPage,
	],
	imports: [
		TimerListCardModule
	],
	exports: [
		TimersPage
	]
})
export class TimersModule { }
