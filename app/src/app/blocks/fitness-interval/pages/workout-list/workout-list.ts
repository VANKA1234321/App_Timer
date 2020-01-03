// Angular
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Rxjs
import { Subscription } from 'rxjs/Subscription';

// Ionic
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseError, User } from 'firebase/app';

// Models
import { Workout } from '../../models';

// Providers
import { NotificationProvider, WorkoutProvider } from '../../providers';

@IonicPage({
  name: 'workout-list'
})
@Component({
  templateUrl: 'workout-list.html',
})
export class WorkoutListPage {
  private _authId: string;
  private _authSubscription: Subscription;
  public workouts$: FirebaseListObservable<Workout[]>;
  constructor(
    private _afAuth: AngularFireAuth,
    private _alertCtrl: AlertController,
    private _navCtrl: NavController,
    private _notifyPvd: NotificationProvider,
    private _workoutPvd: WorkoutProvider
  ) { }

  public addWorkout(): void {
    const newWorkout: Workout = new Workout('00:00:00', '00:00:00', [], '', 0, '00:00:00');
    this._navCtrl.push('workout-edit', { authId: this._authId, workout: newWorkout, id: newWorkout.name });
  }

  public editWorkout(w: Workout): void {
    this._navCtrl.push('workout-edit', { authId: this._authId, workout: w, id: w.name });
  }

  public removeWorkout(w: Workout): void {
    this._alertCtrl.create({
      title: `Remove ${w.name}`,
      subTitle: 'Are you sure you want to delete this workout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: () => {
            this._notifyPvd.showLoading();
            this._workoutPvd.removeWorkout(this._authId, w)
              .then(() => {
                this._notifyPvd.closeLoading();
                this._notifyPvd.showInfo('Workout removed successfully');
              })
              .catch((err: FirebaseError) => {
                this._notifyPvd.closeLoading();
                this._notifyPvd.showError(err.message);
              })
          }
        }
      ]
    }).present();
  }

  public selectWorkout(w: Workout): void {
    this._workoutPvd.saveCurrentWorkout(this._authId, w)
      .then(() => {
        this._navCtrl.setRoot('timer');
      })
      .catch((err: FirebaseError) => {
        this._notifyPvd.showError(err.message);
      })
  }

  ionViewCanEnter(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this._afAuth.authState.subscribe((auth: User) => {
        if (!auth) {
          reject();
          this._navCtrl.setRoot('registration', {
            history: 'workout-list'
          });
        }
        resolve();
      }, (err: FirebaseError) => {
        reject(err);
      });
    });
  }

  ionViewWillEnter(): void {
    this._notifyPvd.showLoading();
    this._authSubscription = this._afAuth.authState.subscribe((auth: User) => {
      if (!!auth) {
        this._authId = auth.uid;
        this.workouts$ = this._workoutPvd.getWorkouts$(this._authId);
      }
    }, (err: FirebaseError) => {
      this._notifyPvd.closeLoading();
      this._notifyPvd.showError(err.message);
    });
  }

  ionViewWillLeave(): void {
    this._authSubscription.unsubscribe();
  }

}
