import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChronoLightPageRoutingModule } from './chrono-light-routing.module';

import { ChronoLightPage } from './chrono-light.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ChronoLightPageRoutingModule
	],
	declarations: [ChronoLightPage]
})
export class ChronoLightPageModule { }
