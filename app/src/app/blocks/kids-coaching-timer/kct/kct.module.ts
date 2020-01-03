import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KCTPageRoutingModule } from './kct-routing.module';

import { KCTPage } from './kct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KCTPageRoutingModule
  ],
  declarations: [KCTPage]
})
export class KCTPageModule {}
