import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-datepicker',
	host: {
		'(valueChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: DatepickerDirective,
			multi: true,
		},
	],
})
export class DatepickerDirective extends BaseValueAccessor {
	constructor(el: ElementRef) {
		super(el);
	}

	override writeValue(value: any) {
		console.log("Write value", this.el.nativeElement.placeholder, value)
		this.el.nativeElement.value = value;
	}
}
