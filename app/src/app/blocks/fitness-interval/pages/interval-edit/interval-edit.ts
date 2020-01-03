// Angular
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Rxjs
import { Subscription } from 'rxjs/Subscription';

// Ionic
import {
  IonicPage,
  Modal,
  ModalController,
  NavParams,
  ViewController
} from 'ionic-angular';

// Models
import { Interval } from '../../models';

@IonicPage({
  name: 'interval-edit'
})
@Component({
  templateUrl: 'interval-edit.html',
})
export class IntervalEditPage {
  private _intervalFormSubscription: Subscription;
  public interval: Interval;
  public intervalForm: FormGroup;
  constructor(
    private _modalCtrl: ModalController,
    private _params: NavParams,
    private _viewCtrl: ViewController
  ) {
    this.interval = <Interval>this._params.get('interval');
    this.intervalForm = new FormGroup({
      duration: new FormControl(this.interval.duration, [Validators.required]),
      name: new FormControl(this.interval.name, [Validators.required])
    });
    this._watchFormChanges();
  }

  private _watchFormChanges(): void {
    this._intervalFormSubscription = this.intervalForm.valueChanges.subscribe(
      (c: {
        duration: string,
        name: string
      }) => {
        if (this.intervalForm.valid) {
          this.interval = Object.assign({}, this.interval, {
            duration: c.duration,
            name: c.name
          });
        }
      },
      (err: Error) => console.error(`Error fetching form changes: ${err}`)
    )
  }

  public cancel(): void {
    this._viewCtrl.dismiss();
  }

  public done(): void {
    this._viewCtrl.dismiss(this.interval);
  }

  public pickColor(): void {
    const modal: Modal = this._modalCtrl.create('color-picker', {
      color: this.interval.color,
      colors: ['#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#43A047', '#7CB342', '#C0CA33', '#FDD835', '#FFB300', '#FB8C00', '#F4511E', '#6D4C41', '#546E7A', '#757575', '#000000']
    }, {
        enableBackdropDismiss: true,
        showBackdrop: true
      });

    modal.present();

    modal.onWillDismiss((color: string) => {
      if (!!color) {
        this.interval.color = color;
      }
    });
  }

  public pickIcon(): void {
    const modal: Modal = this._modalCtrl.create('icon-picker', {
      color: this.interval.color,
      icon: this.interval.icon,
      icons: ['person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person', 'person']
    }, {
        enableBackdropDismiss: true,
        showBackdrop: true
      });

    modal.present();

    modal.onWillDismiss((icon: string) => {
      if (!!icon) {
        this.interval.icon = icon;
      }
    });
  }

}
