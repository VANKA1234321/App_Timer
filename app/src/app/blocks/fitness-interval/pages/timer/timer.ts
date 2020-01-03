// Angular
import { Component } from '@angular/core';
import { trigger, state, style, transition, keyframes, group, animate } from '@angular/animations'

// Rxjs
import { Subscription } from 'rxjs/Subscription';

// Ionic
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  Modal,
  ModalController,
  NavController
} from 'ionic-angular';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseError, User } from 'firebase/app';

// Third party
import Snap from 'snapsvg-cjs';
import TweenMax from 'gsap';
import moment from 'moment';
import { get } from 'lodash';

// Models
import { Workout, WorkoutState } from '../../models';

// Providers
import { NotificationProvider, TimerProvider, WorkoutProvider } from '../../providers';

// Utils
import { mapRange } from '../../utils';

@IonicPage({
  name: 'timer'
})
@Component({
  templateUrl: 'timer.html',
})
export class TimerPage {
  private _authId: string;
  private _authSubscription: Subscription;
  private _workoutStateSubscription: Subscription;
  private _workoutSubscription: Subscription;
  private _workoutTimerSubscription: Subscription;
  private _timeLine: TweenMax.TimelineMax;
  private _timerPath: Snap.Paper;
  private _timerPathLength: number;
  private _timerSvg: Snap;
  private _timerText: Snap.Paper;
  private _timerTween: TweenMax.TimelineLite;
  private _workoutState: WorkoutState;
  public timerPaused: boolean = false;
  public working: boolean = false;
  public workout: Workout;
  public workoutCountdown: string;
  constructor(
    private _afAuth: AngularFireAuth,
    private _navCtrl: NavController,
    private _notifyPvd: NotificationProvider,
    private _timerPvd: TimerProvider,
    private _workoutPvd: WorkoutProvider
  ) {
    this._timeLine = new TweenMax.TimelineMax();
  }

  private _setTimerTween(duration: number): void {
    this._timerTween = this._timeLine.fromTo(this._timerPath.node, duration, {
      'stroke-dasharray': this._timerPathLength + ' ' + this._timerPathLength,
      'stroke-dashoffset': this._timerPathLength
    }, {
        'stroke-dashoffset': 0,
        ease: TweenMax.Power0.easeNone
      }, {
        name: 'tween'
      });
  }

  public pauseWorkout(): void {
    this._workoutStateSubscription.unsubscribe();
    this._workoutTimerSubscription.unsubscribe();
    this._timerTween.pause();
    this.timerPaused = true;
  }

  public resumeWorkout(): void {
    this.timerPaused = false;
    this._timerTween.resume();
    this._workoutTimerSubscription = this._timerPvd.resumeTimer().subscribe((time: number) => {
      const intervalHours: number = moment.duration(time, 'seconds').hours();
      const intervalMinutes: number = moment.duration(time, 'seconds').minutes();
      const intervalSeconds: number = moment.duration(time, 'seconds').seconds();

      this._timerText.attr({
        text: `${intervalHours > 9 ? intervalHours : '0' + intervalHours}:${intervalMinutes > 9 ? intervalMinutes : '0' + intervalMinutes}:${intervalSeconds > 9 ? intervalSeconds : '0' + intervalSeconds}`
      });
    }, (err: any) => {
      this._notifyPvd.showError(err.toString());
    });

    let currentInterval: string;

    this._workoutStateSubscription = this._timerPvd.getState().subscribe((state: WorkoutState) => {
      this._workoutState = state;
      const duration: number = state.coolDown + state.warmUp + state.intervals.reduce((acc, curr) => acc += curr, 0);
      const durationHours: number = moment.duration(duration, 'milliseconds').hours();
      const durationMinutes: number = moment.duration(duration, 'milliseconds').minutes();
      const durationSeconds: number = moment.duration(duration, 'milliseconds').seconds();
      this.workoutCountdown = `${durationHours > 9 ? durationHours : '0' + durationHours}:${durationMinutes > 9 ? durationMinutes : '0' + durationMinutes}:${durationSeconds > 9 ? durationSeconds : '0' + durationSeconds}`;

      if (!currentInterval || (!!currentInterval && currentInterval !== state.current)) {
        if (!!currentInterval) {
          const currentIntervalText: string = currentInterval === 'warmUp' ? 'Warm up' : currentInterval === 'coolDown' ? 'Cool down' : this.workout.intervals[this._workoutState.intervals.indexOf(get(this._workoutState, currentInterval)) % this.workout.rounds].name;
          const nextIntervalText: string = state.current === 'warmUp' ? 'Warm up' : state.current === 'coolDown' ? 'Cool down' : this.workout.intervals[this._workoutState.intervals.indexOf(get(this._workoutState, state.current)) % this.workout.rounds].name;

          if (Notification['permission'] !== 'default') {
            const notify: Notification = new Notification('Time is up', {
              'body': `${currentIntervalText} completed. ${nextIntervalText} started`,
              'icon': 'assets/icon/favicon.ico'
            });
          }
        }
        currentInterval = state.current;
        this._setTimerTween(get(state, currentInterval) / 1000);
      }

      if (duration === 0) {
        this.stopWorkout();
      }
    }, (err: any) => {
      this._notifyPvd.showError(err.toString());
    });
  }

  public skipInterval(): void {
    this.pauseWorkout();
    this._timerPvd.skip();
    this._timerTween.progress(0);
    this._timerTween.remove('tween');
    this.resumeWorkout();
  }

  public startWorkout(): void {
    if (window['Notification'] && Notification['permission'] !== 'granted') {
      Notification.requestPermission()
        .then((p: string) => {
          if (p === 'granted') {
            this._notifyPvd.showInfo('Notifications are enabled!');
          } else if (p === 'denied') {
            this._notifyPvd.showInfo('Notifications are disabled!');
          }
        })
    }
    this.working = true;
    this._workoutTimerSubscription = this._timerPvd.startTimer(this.workout).subscribe((time: number) => {
      const intervalHours: number = moment.duration(time, 'seconds').hours();
      const intervalMinutes: number = moment.duration(time, 'seconds').minutes();
      const intervalSeconds: number = moment.duration(time, 'seconds').seconds();

      this._timerText.attr({
        text: `${intervalHours > 9 ? intervalHours : '0' + intervalHours}:${intervalMinutes > 9 ? intervalMinutes : '0' + intervalMinutes}:${intervalSeconds > 9 ? intervalSeconds : '0' + intervalSeconds}`
      });
    }, (err: any) => {
      this._notifyPvd.showError(err.toString());
    });

    let currentInterval: string;

    this._workoutStateSubscription = this._timerPvd.getState().subscribe((state: WorkoutState) => {
      this._workoutState = state;
      const duration: number = state.coolDown + state.warmUp + state.intervals.reduce((acc, curr) => acc += curr, 0);
      const durationHours: number = moment.duration(duration, 'milliseconds').hours();
      const durationMinutes: number = moment.duration(duration, 'milliseconds').minutes();
      const durationSeconds: number = moment.duration(duration, 'milliseconds').seconds();

      this.workoutCountdown = `${durationHours > 9 ? durationHours : '0' + durationHours}:${durationMinutes > 9 ? durationMinutes : '0' + durationMinutes}:${durationSeconds > 9 ? durationSeconds : '0' + durationSeconds}`;
      if (!currentInterval || (!!currentInterval && currentInterval !== state.current)) {
        if (!!currentInterval) {
          const currentIntervalText: string = currentInterval === 'warmUp' ? 'Warm up' : currentInterval === 'coolDown' ? 'Cool down' : this.workout.intervals[this._workoutState.intervals.indexOf(get(this._workoutState, currentInterval)) % this.workout.rounds].name;
          const nextIntervalText: string = state.current === 'warmUp' ? 'Warm up' : state.current === 'coolDown' ? 'Cool down' : this.workout.intervals[this._workoutState.intervals.indexOf(get(this._workoutState, state.current)) % this.workout.rounds].name;

          if (Notification['permission'] !== 'default') {
            const notify: Notification = new Notification('Time is up', {
              'body': `${currentIntervalText} completed. ${nextIntervalText} started`,
              'icon': 'assets/icon/favicon.ico'
            });
          }
        }
        currentInterval = state.current;
        this._setTimerTween(get(state, currentInterval) / 1000);
      }

      if (duration === 0) {
        this.stopWorkout();
      }
    }, (err: any) => {
      this._notifyPvd.showError(err.toString());
    });
  }

  public stopWorkout(): void {
    this._workoutStateSubscription.unsubscribe();
    this._workoutTimerSubscription.unsubscribe();
    this._timerTween.progress(0);
    this._timerTween.kill();
    this.working = false;
  }

  public viewWorkouts(): void {
    this._navCtrl.push('workout-list');
  }

  ionViewCanEnter(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this._afAuth.authState.subscribe((auth: User) => {
        if (!auth) {
          reject();
          this._navCtrl.setRoot('registration', {
            history: 'timer'
          });
        }
        resolve();
      }, (err: FirebaseError) => {
        reject(err);
      });
    });
  }


  ionViewWillEnter(): void {
    this._timerSvg = Snap('#svg');
    Snap.load('assets/svg/TimerSVG2.svg', (t: any) => {
      this._timerSvg.append(t);
      this._timerPath = this._timerSvg.select('#timerProgress');
      this._timerPathLength = this._timerPath.getTotalLength();
      this._timerText = this._timerSvg.select('#timerText');
    });

    this._notifyPvd.showLoading();
    this._authSubscription = this._afAuth.authState.subscribe((auth: User) => {
      if (!!auth) {
        this._authId = auth.uid;
        this._workoutSubscription = this._workoutPvd.getCurrentWorkout$(this._authId).subscribe((w: Workout) => {
          this.workout = w;
          this._notifyPvd.closeLoading();
        }, (err: FirebaseError) => {
          this._notifyPvd.closeLoading();
          this._notifyPvd.showError(err.message);
        });
      }
    }, (err: FirebaseError) => {
      this._notifyPvd.showError(err.message);
    });
  }

  ionViewWillLeave(): void {
    this._authSubscription.unsubscribe();
    this._workoutSubscription.unsubscribe();
  }

}
