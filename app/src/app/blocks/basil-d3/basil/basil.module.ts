import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasilPageRoutingModule } from './basil-routing.module';

import { BasilPage } from './basil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasilPageRoutingModule
  ],
  declarations: [BasilPage]
})
export class BasilPageModule {}
