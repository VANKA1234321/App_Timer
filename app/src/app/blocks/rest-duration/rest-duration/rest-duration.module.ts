import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestDurationPageRoutingModule } from './rest-duration-routing.module';

import { RestDurationPage } from './rest-duration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestDurationPageRoutingModule
  ],
  declarations: [RestDurationPage]
})
export class RestDurationPageModule {}
