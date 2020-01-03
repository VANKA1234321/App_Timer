import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IFastPageRoutingModule } from './i-fast-routing.module';

import { IFastPage } from './i-fast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IFastPageRoutingModule
  ],
  declarations: [IFastPage]
})
export class IFastPageModule {}
