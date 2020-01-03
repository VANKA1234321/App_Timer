// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
  name: 'icon-picker'
})
@Component({
  templateUrl: 'icon-picker.html',
})
export class IconPickerPage {
  public color: string;
  public icon: string;
  public icons: string[];
  constructor(
    private _params: NavParams,
    private _viewCtrl: ViewController
    ) {
      this.color = this._params.get('color');
      this.icon = this._params.get('icon');
      this.icons = <string[]>this._params.get('icons');
  }

  public selectIcon(icon: string): void {
    this._viewCtrl.dismiss(icon);
  }
}
