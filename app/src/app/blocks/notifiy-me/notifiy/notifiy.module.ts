import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifiyPageRoutingModule } from './notifiy-routing.module';

import { NotifiyPage } from './notifiy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifiyPageRoutingModule
  ],
  declarations: [NotifiyPage]
})
export class NotifiyPageModule {}
