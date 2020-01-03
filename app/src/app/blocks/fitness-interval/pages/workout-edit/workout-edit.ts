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
  NavController,
  NavParams
} from 'ionic-angular';

// Firebase
import { FirebaseError, User } from 'firebase/app';

// Models
import { Interval, Workout } from '../../models';

// Providers
import { NotificationProvider, WorkoutProvider } from '../../providers';


@IonicPage({
  name: 'workout-edit'
})
@Component({
  templateUrl: 'workout-edit.html',
})
export class WorkoutEditPage {
  private _authId: string;
  private _workoutFormSubscription: Subscription;
  public unsavedChanges: boolean = false;
  public workout: Workout;
  public workoutForm: FormGroup;
  constructor(
    private _modalCtrl: ModalController,
    private _navCtrl: NavController,
    private _params: NavParams,
    private _notifyPvd: NotificationProvider,
    private _workoutPvd: WorkoutProvider
  ) {
    this._authId = this._params.get('authId');
    this.workout = <Workout>this._params.get('workout');
    if (!this.workout) {
      this._navCtrl.setRoot('workout-list');
    }
    this.workout = this.workout || new Workout('00:00:00', '00:00:00', [], '', 0, '00:00:00');
    this.workoutForm = new FormGroup({
      coolDown: new FormControl(this.workout.coolDown, [Validators.required]),
      name: new FormControl(this.workout.name, [Validators.required]),
      rounds: new FormControl(this.workout.rounds, [Validators.required]),
      warmUp: new FormControl(this.workout.warmUp, [Validators.required])
    });
    this._watchFormChanges();
  }

  private _watchFormChanges(): void {
    this._workoutFormSubscription = this.workoutForm.valueChanges.subscribe(
      (c: {
        coolDown: string,
        name: string,
        rounds: string,
        warmUp: string
      }) => {
        if (this.workoutForm.valid) {
          this.unsavedChanges = true;
          this.workout = Object.assign({}, this.workout, {
            '$key': this.workout['$key'],
            coolDown: c.coolDown,
            name: c.name,
            rounds: c.rounds,
            warmUp: c.warmUp
          });
        }
      },
      (err: Error) => console.error(`Error fetching form changes: ${err}`)
    )
  }

  public addInterval(): void {
    const newInterval: Interval = new Interval('', '00:00:00', '', '');
    const modal: Modal = this._modalCtrl.create('interval-edit', { interval: newInterval, id: newInterval.name }, {
      enableBackdropDismiss: false
    });
    modal.present();
    modal.onWillDismiss((data: Interval) => {
      if (!!data) {
        this.unsavedChanges = true;
        this.workout.intervals.push(data);
      }
    });
  }

  public editInterval(idx: number): void {
    const interval: Interval = this.workout.intervals[idx];
    const modal: Modal = this._modalCtrl.create('interval-edit', { interval, id: interval.name }, {
      enableBackdropDismiss: false
    });
    modal.present();
    modal.onWillDismiss((data: Interval) => {
      if (!!data) {
        this.unsavedChanges = true;
        this.workout.intervals[idx] = Object.assign({}, data);
      }
    });
  }

  public removeInterval(idx: number): void {
    this.workout.intervals.splice(idx, 1);
  }

  public removeWorkout(): void {
    this._workoutPvd.removeWorkout(this._authId, this.workout)
      .then(() => {
        this._notifyPvd.showInfo('Workout removed successfully');
        this._navCtrl.pop();
      })
      .catch((err: FirebaseError) => {
        this._notifyPvd.showError(err.message);
        this._navCtrl.pop();
      });
  }

  public saveWorkout(): void {
    this.workout.duration = this._workoutPvd.calculateDuration(this.workout);
    this._workoutPvd.saveWorkout(this._authId, this.workout)
      .then(() => {
        this._notifyPvd.showInfo('Workout saved successfully');
        this._navCtrl.pop();
      })
      .catch((err: FirebaseError) => {
        this._notifyPvd.showError(err.message);
        this._navCtrl.pop();
      });
  }

}
