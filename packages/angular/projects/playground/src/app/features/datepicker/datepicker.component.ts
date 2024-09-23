import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	templateUrl: 'datepicker.component.html',
})
export class DatepickerComponent {
	public form = new FormGroup({
		startDate: new FormControl(null),
		endDate: new FormControl(null),
	});
	constructor() {}
}
