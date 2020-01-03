// Angular
import { Injectable } from '@angular/core';

// Rxjs
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { concat, map, repeat, skipWhile, startWith, takeUntil, timeInterval } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';

// Lodash
import { get, set } from 'lodash';

// Moment.js
import moment from 'moment';

// Models
import { Interval, Workout, WorkoutState } from '../../models';

@Injectable()
export class TimerProvider {
  private _state: WorkoutState;
  private _stateSubject: Subject<WorkoutState> = new Subject();
  private _workout: Workout;
  constructor() { }

  private _createStandardTimer(duration: number, stateParam: string): Observable<number> {
    return timer(0, 1000)
      .pipe(timeInterval(),
        takeUntil(timer(duration + 1000)),
        map(v => {
          this._state.current = stateParam;
          set(this._state, stateParam, duration - v.value * 1000);
          this._stateSubject.next(this._state);
          return duration / 1000 - v.value;
        }));
  }

  private _createStartIntervalTimer(duration: number, idx: number): Observable<number> {
    return timer(0, 1000)
      .pipe(timeInterval(),
        takeUntil(timer(duration + 1000)),
        map(v => {
          this._state.current = `intervals[${idx}]`;
          this._state.intervals[idx] = duration - v.value * 1000;
          this._stateSubject.next(this._state);
          return duration / 1000 - v.value;
        }));
  }

  public countDown(duration: number): Observable<number> {
    return timer(0, 1000)
      .pipe(timeInterval(),
        takeUntil(timer(duration + 1000)),
        map(v => duration / 1000 - v.value));
  }

  public getState(): Subject<WorkoutState> {
    return this._stateSubject;
  }

  public replay(): void {
    this.startTimer();
  }

  public skip(): void {
    set(this._state, this._state.current, 0);
  }

  public startTimer(workout?: Workout): Observable<number> {
    this._workout = Object.assign({}, workout);

    this._state = new WorkoutState(
      moment.duration(this._workout.coolDown, <moment.DurationInputArg2>'HH:mm:ss').asMilliseconds(),
      'warmUp',
      [],
      moment.duration(this._workout.warmUp, <moment.DurationInputArg2>'HH:mm:ss').asMilliseconds()
    );

    for (let i: number = 0; i < this._workout.rounds; i++) {
      this._state.intervals = [...this._state.intervals, ...this._workout.intervals.map((i: Interval) => moment.duration(i.duration, <moment.DurationInputArg2>'HH:mm:ss').asMilliseconds())]
    }

    const warmupObs$: Observable<number> = this._createStandardTimer(moment.duration(this._workout.warmUp, <moment.DurationInputArg2>'HH:mm:ss').asMilliseconds(), 'warmUp');

    const coolDownObs$: Observable<number> = this._createStandardTimer(moment.duration(this._workout.coolDown, <moment.DurationInputArg2>'HH:mm:ss').asMilliseconds(), 'coolDown');

    let intervalObs$: Observable<number>;

    for (let i: number = 0; i < this._workout.rounds; i++) {
      this._workout.intervals.forEach((int: Interval, idx: number) => {
        const obs$: Observable<number> = this._createStandardTimer(moment.duration(int.duration, <moment.DurationInputArg2>'HH:mm:ss').asMilliseconds(), `intervals[${idx}]`);
        intervalObs$ = !!intervalObs$ ? intervalObs$.pipe(concat(obs$)) : obs$;
      });
    }

    return warmupObs$.pipe(concat(intervalObs$), concat(coolDownObs$));
  }

  public resumeTimer(): Observable<number> {
    const { coolDown, intervals, warmUp } = this._state;
    let warmupObs$: Observable<number>;

    if (warmUp > 0) {
      warmupObs$ = this._createStandardTimer(warmUp, 'warmUp');
    }

    const coolDownObs$: Observable<number> = this._createStandardTimer(coolDown, 'coolDown');

    let intervalObs$: Observable<number>;

    intervals.forEach((int: number, idx: number) => {
      if (int > 0) {
        const obs$: Observable<number> = this._createStandardTimer(int, `intervals[${idx}]`);
        intervalObs$ = !!intervalObs$ ? intervalObs$.pipe(concat(obs$)) : obs$;
      }
    });

    if (warmupObs$) {
      return warmupObs$.pipe(concat(intervalObs$), concat(coolDownObs$));
    } else if (intervalObs$) {
      return intervalObs$.pipe(concat(coolDownObs$));
    } else {
      return coolDownObs$;
    }
  }
}