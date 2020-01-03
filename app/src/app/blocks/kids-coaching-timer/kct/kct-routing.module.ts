import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KCTPage } from './kct.page';

const routes: Routes = [
  {
    path: '',
    component: KCTPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KCTPageRoutingModule {}
