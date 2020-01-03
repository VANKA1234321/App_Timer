import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  historyRoot = HistoryPage;
  settingsRoot = SettingsPage;

  constructor() {

  }
}
