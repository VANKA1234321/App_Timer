import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

import * as moment from 'moment';
import { HelperService } from '../helpers/helper.service';

@Injectable()
export class DateService {
	private helper = new HelperService('DateService');

	public date = moment();

	constructor() {
		this.helper.log('constructur');

		const source = interval(150);

		source.subscribe((x) => {
			this.date = moment();
		});
	}
}
