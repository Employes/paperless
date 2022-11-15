import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QuickFilter } from '@paperless/core';
import { timer } from 'rxjs';
import { debounce, filter, map, pairwise, startWith } from 'rxjs/operators';
import { FormBaseComponent } from './form.component';

export type TableQuickFilter = QuickFilter & {
    value: string;
    metricName?: string;
};

export interface TableOptions {
    pageSize: number;
    page: number;
    quickFilter: TableQuickFilter | string | null;
    query: string;
    filters: any[];
    selectedRows: any[];
}

@UntilDestroy({ checkProperties: true })
@Component({
    template: ``,
})
export abstract class BaseTableComponent
    extends FormBaseComponent
    implements OnInit
{
    protected quickFilters: any[] = [];

    public pageSizeDefault = 12;
    public tableOptions?: FormControl<TableOptions>;

    private _defaultTableValues: TableOptions = {
        pageSize: this.pageSizeDefault,
        page: 1,
        quickFilter: null,
        query: '',
        filters: [],
        selectedRows: [],
    };
    public defaultTableValues: Partial<TableOptions> = {};

    get pageSize() {
        if (!this.tableOptions) {
            return this._defaultTableValues.pageSize;
        }

        return this.tableOptions.value.pageSize;
    }

    get page() {
        if (!this.tableOptions) {
            return this._defaultTableValues.page;
        }

        return this.tableOptions.value.page;
    }

    get quickFilter() {
        if (!this.tableOptions) {
            return this._defaultTableValues.quickFilter;
        }

        return this.tableOptions.value.quickFilter;
    }
    set quickFilter(quickFilter: TableQuickFilter | string | null) {
        this.tableValues = {
            quickFilter,
        };
    }

    get query() {
        if (!this.tableOptions) {
            return this._defaultTableValues.query;
        }

        return this.tableOptions.value.query;
    }
    set query(query: string) {
        this.tableValues = {
            query,
        };
    }

    get filters() {
        if (!this.tableOptions) {
            return this._defaultTableValues.filters;
        }

        return this.tableOptions.value.filters;
    }
    set filters(filters: any[]) {
        this.tableValues = {
            filters,
        };
    }

    get selectedRows() {
        if (!this.tableOptions) {
            return this._defaultTableValues.selectedRows;
        }

        return this.tableOptions.value.selectedRows;
    }
    set selectedRows(selectedRows: any[]) {
        this.tableValues = {
            selectedRows,
        };
    }

    // setter
    get parsedDefaultTableValues() {
        return {
            ...this._defaultTableValues,
            ...this.defaultTableValues,
            pageSize: this.defaultTableValues?.pageSize || this.pageSizeDefault,
        };
    }

    get tableValues() {
        return this.tableOptions?.value ?? {};
    }

    set tableValues(values: Partial<TableOptions>) {
        this._setTableValues({
            ...this.tableValues,
            ...values,
        });
    }

    constructor() {
        super();
    }

    ngOnInit() {
        this.tableOptions = new FormControl<TableOptions>({
            pageSize: this.parsedDefaultTableValues.pageSize,
            page: this.parsedDefaultTableValues.page,
            quickFilter: this.parsedDefaultTableValues.quickFilter,
            query: this.parsedDefaultTableValues.query,
            filters: this.parsedDefaultTableValues.filters,
            selectedRows: this.parsedDefaultTableValues.selectedRows,
        }) as FormControl<TableOptions>;

        this.tableOptions.valueChanges
            .pipe(
                untilDestroyed(this),
                startWith(this.tableOptions.value),
                pairwise(),
                map(([previous, next]) => this._getChanges(previous, next)),
                filter((changes: any) => !!changes),
                debounce((changes) => {
                    if (changes?.query && Object.keys(changes)?.length === 1) {
                        return timer(300);
                    }

                    return timer(0);
                }),
                filter(
                    (changes: any) =>
                        !(
                            changes?.selected &&
                            Object.keys(changes)?.length === 1
                        )
                )
            )
            .subscribe((changes: TableOptions) => {
                if (changes?.page) {
                    this._refresh();
                    return;
                }

                this._resetPageOrRefresh();
            });

        this._refresh();
    }

    resetTable(emitEvent = true, forceRefresh = null) {
        this._setTableValues(this.parsedDefaultTableValues, emitEvent);

        if (forceRefresh) {
            this._refresh();
        }
    }

    protected _refresh() {
        console.warn('Not implemented');
    }

    private _resetPageOrRefresh() {
        if (!this.tableOptions) {
            return;
        }

        if (this.page !== 1) {
            this.tableOptions.get('page')?.setValue(1);
            return;
        }

        this._refresh();
    }

    private _setTableValues(data: Partial<TableOptions>, emitEvent = true) {
        this.tableOptions?.setValue(
            {
                ...this.tableOptions.value,
                ...data,
            },
            { emitEvent }
        );
    }

    private _getChanges(previous: TableOptions, next: TableOptions) {
        const changes: Partial<TableOptions> = {};

        let key: keyof TableOptions;
        for (key in next) {
            if (key === 'selectedRows') {
                continue;
            }

            if (JSON.stringify(previous[key]) !== JSON.stringify(next[key])) {
                // @ts-ignore
                changes[key] = next[key];
            }
        }

        return Object.keys(changes).length ? changes : null;
    }
}
