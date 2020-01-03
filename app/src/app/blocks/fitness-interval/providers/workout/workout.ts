// Angular
import { Injectable } from '@angular/core';

// SQLite
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


// Moment.js
import * as moment from 'moment';

// Models
import { Interval, Workout } from '../../models';
import { Platform } from '@ionic/angular';

@Injectable()
export class WorkoutProvider {
	private database: SQLiteObject;

	constructor(
		private platform: Platform,
		private sqlite: SQLite,
	) {
		//
		platform.ready().then(() => {
			this.sqlite
				.create({ name: 'bleDB.db', location: 'default' })
				.then((db: SQLiteObject) => {
					this.database = db;
				})
				.catch(e => console.log(e));
		});

	}

	public calculateDuration(w: Workout): string {
		const duration: number =
			moment.duration(w.coolDown, 'HH:mm:ss' as moment.DurationInputArg2).asMilliseconds() +
			moment.duration(w.warmUp, 'HH:mm:ss' as moment.DurationInputArg2).asMilliseconds() +
			w.rounds * w.intervals.reduce((acc: number, curr: Interval) =>
				acc += moment.duration(curr.duration, 'HH:mm:ss' as moment.DurationInputArg2).asMilliseconds(), 0);

		return `${moment.duration(duration, 'milliseconds').hours()}:${moment.duration(duration, 'milliseconds').minutes()}:${moment.duration(duration, 'milliseconds').seconds()}`
	}

	getCurrentWorkout(authId: string): Workout {
		// TODO: return this._db.object(`/${authId}/current-workout/`);
	}

	getWorkouts$(authId: string): Workout[] {
		// TODO: return this._db.list(`/${authId}/workouts/`);
	}

	removeWorkout(authId: string, workout: Workout): Promise<void> {
		// TODO: return this._db.list(`/${authId}/workouts/`).remove(workout['$key']);
	}

	saveCurrentWorkout(authId: string, workout: Workout): Promise<void> {
		// TODO: return this._db.object(`/${authId}/current-workout/`).set(workout);
	}

	saveWorkout(authId: string, workout: Workout): Promise<void> {
		return new Promise((resolve, reject) => {
			console.log(workout);
			if ('$key' in workout) {
				this._db.list(`/${authId}/workouts/`).update(workout['$key'], workout)
					.then(() => resolve())
					.catch((err: FirebaseError) => reject(err));
			} else {
				this._db.list(`/${authId}/workouts/`).push(workout)
					.then(() => resolve());
			}
		})
	}
}
