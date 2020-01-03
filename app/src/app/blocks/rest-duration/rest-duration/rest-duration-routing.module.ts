import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestDurationPage } from './rest-duration.page';

const routes: Routes = [
  {
    path: '',
    component: RestDurationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestDurationPageRoutingModule {}
