import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: () => import('./pages.base/home/home.module').then(m => m.HomePageModule) },
	{ path: 'list', loadChildren: () => import('./pages.base/list/list.module').then(m => m.ListPageModule) },
	{ path: 'alarm', loadChildren: () => import('./blocks/alarm/alarm/alarm.module').then(m => m.AlarmPageModule) },
	{ path: 'background', loadChildren: () => import('./blocks/background/background/background.module').then(m => m.BackgroundPageModule) },
	{ path: 'basil', loadChildren: () => import('./blocks/basil-d3/basil/basil.module').then(m => m.BasilPageModule) },
	{ path: 'chrono-light', loadChildren: () => import('./blocks/chrono-light/chrono-light.module').then(m => m.ChronoLightPageModule) },
	{ path: 'fitness', loadChildren: () => import('./blocks/fitness-interval/fitness/fitness.module').then(m => m.FitnessPageModule) },
	{ path: 'kct', loadChildren: () => import('./blocks/kids-coaching-timer/kct/kct.module').then(m => m.KCTPageModule) },
	{ path: 'notifiy', loadChildren: () => import('./blocks/notifiy-me/notifiy/notifiy.module').then(m => m.NotifiyPageModule) },
	{ path: 'play', loadChildren: () => import('./blocks/play/play/play.module').then(m => m.PlayPageModule) },
	{ path: 'reminder', loadChildren: () => import('./blocks/reminder/pages/reminder/reminder.module').then(m => m.ReminderPageModule) },
	{ path: 'rest-duration', loadChildren: () => import('./blocks/rest-duration/rest-duration/rest-duration.module').then(m => m.RestDurationPageModule) },
	{ path: 'stopwatch', loadChildren: () => import('./blocks/stopwatch/pages/stopwatch.module').then(m => m.StopwatchPageModule) },
	{ path: 'tomatur', loadChildren: () => import('./blocks/tomatur/pages/tomatur.module').then(m => m.TomaturPageModule) },
	{ path: 'i-fast', loadChildren: () => import('./blocks/ifast/pages/i-fast/i-fast.module').then(m => m.IFastPageModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
