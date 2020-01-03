import	{ Interval } from './interval.model';

export	class Workout {
	constructor(
		public coolDown: string,
		public duration: string,
		public intervals: Interval[],
		public name: string,
		public rounds: number,
		public warmUp: string
	) { }
}

export	class WorkoutState {
	constructor(
		public coolDown: number,
		public current: string,
		public intervals: number[],
		public warmUp: number
	) { }
}
