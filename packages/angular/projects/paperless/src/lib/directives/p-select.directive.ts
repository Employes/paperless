import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-select',
	host: {
		'(valueChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: SelectDirective,
			multi: true,
		},
	],
})
export class SelectDirective extends BaseValueAccessor {
	constructor(el: ElementRef) {
		super(el);

		console.log(el);
	}

	override writeValue(value: any) {
		console.log(value);
		this.el.nativeElement.value = this.lastValue =
			value == null ? '' : value;
	}
}
