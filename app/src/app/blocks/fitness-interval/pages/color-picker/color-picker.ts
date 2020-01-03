// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
  name: 'color-picker'
})
@Component({
  templateUrl: 'color-picker.html',
})
export class ColorPickerPage {
  public color: string;
  public colors: string[];
  constructor(
    private _params: NavParams,
    private _viewCtrl: ViewController
    ) {
      this.color = this._params.get('color');
      this.colors = <string[]>this._params.get('colors');
  }

  public selectColor(color: string): void {
    this._viewCtrl.dismiss(color);
  }
}
