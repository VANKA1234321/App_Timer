import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IFastPage } from './i-fast.page';

const routes: Routes = [
  {
    path: '',
    component: IFastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IFastPageRoutingModule {}
