import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	/* tslint:disable-next-line:directive-selector */
	selector: 'p-table-footer',
	host: {
		'(pageChange)': 'handleChange($event.detail, "page")',
		'(pageSizeChange)': 'handleChange($event.detail, "pageSize")',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: TableFooterDirective,
			multi: true,
		},
	],
})
export class TableFooterDirective extends BaseValueAccessor {
	protected override lastValue: any = {
		page: 1,
		pageSize: 12,
	};

	constructor(el: ElementRef) {
		super(el);
	}

	override writeValue(value: any) {
		console.log('??');
		this.el.nativeElement.page = this.lastValue.page =
			value?.page == null ? '' : value?.page;
		this.el.nativeElement.pageSize = this.lastValue.pageSize =
			value?.pageSize == null ? '' : value?.pageSize;
	}

	public handleChange(value: number, type: 'page' | 'pageSize') {
		this.handleChangeEvent({
			...this.lastValue,
			[type]: value,
		});
	}
}
