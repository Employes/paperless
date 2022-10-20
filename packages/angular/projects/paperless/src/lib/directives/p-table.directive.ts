import { Directive, ElementRef } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QuickFilter } from '@paperless/core';

import { BaseValueAccessor } from '../base';

export interface TableDirectiveValue {
	query?: string;
	quickFilter?: QuickFilter;
	page?: number;
	pageSize?: number;
	selectedRows?: any[];
}

@UntilDestroy({ checkProperties: true })
@Directive({
	/* tslint:disable-next-line:directive-selector */
	selector: 'p-table',
	inputs: ['formGroup'],
	host: {
		'(queryChange)': 'handleChange($event.detail, "query")',
		'(quickFilter)': 'handleChange($event.detail, "quickFilter")',
		'(pageChange)': 'handleChange($event.detail, "page")',
		'(pageSizeChange)': 'handleChange($event.detail, "pageSize")',
		'(selectedRowsChange)': 'handleChange($event.detail, "selectedRows")',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: TableDirective,
			multi: true,
		},
	],
})
export class TableDirective extends BaseValueAccessor {
	protected override lastValue: TableDirectiveValue = {
		query: '',
		quickFilter: undefined,
		page: 1,
		pageSize: 12,
		selectedRows: [],
	};

	public formGroup?: FormGroup;

	constructor(el: ElementRef) {
		super(el);
	}

	public override writeValue(value: TableDirectiveValue) {
		this.el.nativeElement.query = this.lastValue.query = value?.query;
		this.lastValue.quickFilter = value?.quickFilter;

		this.el.nativeElement.page = this.lastValue.page =
			value?.page == null ? 1 : value?.page;
		this.el.nativeElement.pageSize = this.lastValue.pageSize =
			value?.pageSize == null ? 12 : value?.pageSize;

		this.lastValue.selectedRows =
			value?.selectedRows == null ? [] : value?.selectedRows;


		if(value?.quickFilter) {
			this._setActiveQuickFilter(value.quickFilter);
		}
	}

    public override registerOnChange(fn: (value: any) => void) {
        this.formGroup?.valueChanges.pipe(untilDestroyed(this)).subscribe(fn);
    }

    public override registerOnTouched(fn: () => void) {
        this.formGroup?.statusChanges.pipe(untilDestroyed(this)).subscribe(fn);
    }

	public handleChange(
		value: number | string | QuickFilter,
		type: 'page' | 'pageSize' | 'query' | 'quickFilter' | 'selectedRows'
	) {
		this.handleChangeEvent({
			...this.lastValue,
			[type]: value,
		});

		if (type === 'quickFilter' && typeof value === 'object') {
			this._setActiveQuickFilter(value);
		}
	}

	private _setActiveQuickFilter(quickFilter: QuickFilter) {
		this.el.nativeElement.activeQuickFilterIdentifier =
			quickFilter?.identifier;
	}
}
