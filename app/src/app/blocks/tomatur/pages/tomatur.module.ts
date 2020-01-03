import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomaturPageRoutingModule } from './tomatur-routing.module';

import { TomaturPage } from './tomatur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomaturPageRoutingModule
  ],
  declarations: [TomaturPage]
})
export class TomaturPageModule {}
