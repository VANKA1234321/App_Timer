import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomaturPage } from './tomatur.page';

const routes: Routes = [
	{
		path: '',
		component: TomaturPage
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TomaturPageRoutingModule { }
