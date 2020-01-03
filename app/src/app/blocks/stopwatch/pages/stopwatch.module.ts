import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StopwatchPageRoutingModule } from './stopwatch-routing.module';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { StopwatchPage } from './stopwatch.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		StopwatchPageRoutingModule
	],
	declarations: [StopwatchPage]
})
export class StopwatchPageModule { }
