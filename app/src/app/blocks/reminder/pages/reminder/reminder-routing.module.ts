import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReminderPage } from './reminder.page';

const routes: Routes = [
	{
		path: 'rmeinder',
		component: ReminderPage,
		children: [
			{ path: 'config', children: [{ path: '', loadChildren: () => import('../config/config.module').then(m => m.ReminderConfigPageModule) }] },
			{ path: 'manual', children: [{ path: '', loadChildren: () => import('../manual/manual.module').then(m => m.ReminderManualPageModule) }] },
			{ path: 'main', children: [{ path: '', loadChildren: () => import('../main/main.module').then(m => m.ReminderMainPageModule) }] },
			{ path: '', redirectTo: '/reminder/main', pathMatch: 'full' }
		]
	},
	{
		path: '',
		redirectTo: '/reminder/main',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReminderPageRoutingModule { }
