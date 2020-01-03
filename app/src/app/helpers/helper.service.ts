import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HelperService {
	private _PREFIX = '';

	constructor(public prefix: string) {
		this._PREFIX = prefix;
	}

	log(func, line = '') {
		console.log(this._PREFIX + '::' + func + '|' + line);
	}
}
