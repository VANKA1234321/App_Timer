import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasilPage } from './basil.page';

const routes: Routes = [
  {
    path: '',
    component: BasilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasilPageRoutingModule {}
