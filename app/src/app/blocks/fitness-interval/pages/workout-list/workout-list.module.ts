import { NgModule } from '@angular/core';

import { WorkoutListPage } from './workout-list';
import { WorkoutProviderModule } from '../../providers/workout/workout.module';

@NgModule({
	declarations: [
		WorkoutListPage,
	],
	imports: [
		WorkoutProviderModule
	],
})
export class WorkoutListPageModule { }
