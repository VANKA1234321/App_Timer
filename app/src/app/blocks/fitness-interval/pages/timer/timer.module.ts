import { NgModule } from '@angular/core';

import { TimerPage } from './timer';
import { WorkoutProviderModule } from '../../providers/workout/workout.module';

@NgModule({
	declarations: [
		TimerPage,
	],
	imports: [
		WorkoutProviderModule
	],
})
export class TimerPageModule { }
