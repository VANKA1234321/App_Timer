import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChronoLightPage } from './chrono-light.page';

const routes: Routes = [
  {
    path: '',
    component: ChronoLightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronoLightPageRoutingModule {}
