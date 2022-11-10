import {
    Component,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Listen,
    Prop,
    State,
    Watch,
} from '@stencil/core';
import { QuickFilter, RowClickEvent } from '../../../types/table';
import { formatTranslation, getLocaleComponentStrings } from '../../../utils';
import { TableColumn } from '../../helpers/table-column/table-column.component';
import {
    defaultSize,
    defaultSizeOptions,
} from '../../molecules/page-size-select/constants';
import { buttonTemplateFunc } from '../../molecules/table-header/table-header.component';

export type templateFunc = () => string;

@Component({
    tag: 'p-table',
    styleUrl: 'table.component.scss',
})
export class Table {
    /**
     * The items to be fed to the table
     */
    @Prop() items: string;

    /**
     * Wether data is loading
     */
    @Prop() loading: boolean = false;

    /**
     * The amount of loading rows to show
     */
    @Prop() amountOfLoadingRows: number = 4;

    /**
     * Wether to enable selection
     */
    @Prop() enableRowSelection: boolean = true;

    /**
     * Wether to enable row clicking
     */
    @Prop() enableRowClick: boolean = true;

    /**
     * The current selection of items
     */
    @Prop() selectedRows: any[] = [];

    /**
     * Event whenever the current selection changes
     */
    @Event() selectedRowsChange: EventEmitter<any>;

    /**
     * The key to determine if a row is selected
     */
    @Prop() selectionKey: string;

    /**
     * A key to determine if a row can be selected
     */
    @Prop() canSelectKey: string;

    /**
     * Event whenever a row is clicked
     */
    @Event() rowClick: EventEmitter<RowClickEvent>;

    /**
     * Event whenever a row is selected
     */
    @Event() rowSelected: EventEmitter<any>;

    /**
     * Event whenever a row is deselected
     */
    @Event() rowDeselected: EventEmitter<any>;

    /**
     * Event when the table has rendered
     */
    @Event() hasRendered: EventEmitter<number>;

    /** START HEADER */
    /**
     * Quick filters to show
     */
    @Prop() quickFilters: QuickFilter[] = [];

    /**
     * Active quick filter identifier
     */
    @Prop() activeQuickFilterIdentifier: string;

    /**
     * Wether to show the search input
     */
    @Prop() enableSearch: boolean = true;

    /**
     * The query to show in the search bar
     */
    @Prop({ mutable: true }) query: string;

    /**
     * Wether to show the filter button
     */
    @Prop() enableFilter: boolean = true;

    /**
     * The amount of filters being selected
     */
    @Prop() selectedFiltersAmount: number;

    /**
     * The template for the filter button text
     */
    @Prop() filterButtonTemplate: templateFunc;

    /**
     * Wether to show the edit button
     */
    @Prop() enableEdit: boolean = true;

    /**
     * The template for the edit button text
     */
    @Prop() editButtonTemplate: buttonTemplateFunc;

    /**
     * Event when one of the quick filters is clicked
     */
    @Event() quickFilter: EventEmitter<QuickFilter>;

    /**
     * Event when the query changes
     */
    @Event() queryChange: EventEmitter<string>;

    /**
     * Event when the filter button is clicked
     */
    @Event() filter: EventEmitter<null>;

    /**
     * Event when the edit button is clicked
     */
    @Event() edit: EventEmitter<null>;

    /** START FOOTER */

    /**
     * Wether to enable page size select
     */
    @Prop() enablePageSize: boolean = true;

    /**
     * Wether to enable pagination
     */
    @Prop() enablePagination: boolean = true;

    /**
     * Wether to enable export
     */
    @Prop() enableExport: boolean = true;

    /**
     * The current page
     */
    @Prop({ mutable: true, reflect: true }) page: number = 1;

    /**
     * The total amount of items
     */
    @Prop() total!: number;

    /**
     * Event whenever the page changes
     */
    @Event() pageChange: EventEmitter<number>;

    /**
     * The amount of items per page
     */
    @Prop() pageSize: number = defaultSize;

    /**
     * The options for the page size
     */
    @Prop() pageSizeOptions: number[] = defaultSizeOptions;

    /**
     * Event whenever the page changes
     */
    @Event() pageSizeChange: EventEmitter<number>;

    /**
     * Event whenever the page changes
     */
    @Event() export: EventEmitter<number>;

    /**
     * Wether to hide when there is only 1 page available
     */
    @Prop() hideOnSinglePage: boolean = true;

    /* Empty state start */

    @Prop() emptyStateHeader: templateFunc = () =>
        formatTranslation(this._locales.empty_state?.no_filter.header);
    @Prop() emptyStateContent: templateFunc = () =>
        formatTranslation(this._locales.empty_state?.no_filter.content);
    @Prop() emptyStateAction: templateFunc = () =>
        formatTranslation(this._locales.empty_state?.no_filter.action);

    @Prop() emptyStateFilteredHeader: templateFunc = () =>
        formatTranslation(this._locales.empty_state.filtered.header);
    @Prop() emptyStateFilteredContent: templateFunc = () =>
        formatTranslation(this._locales.empty_state.filtered.content);

    /**
     * Event whenever the empty state is clicked
     */
    @Event() emptyStateActionClick: EventEmitter<null>;

    /* Empty state end */

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    /**
     * Locales used for this component
     */
    @State() private _locales: any = {};

    @State() private _columns: any[] = [];
    @State() private _items: any[] = [];

    private _ctrlDown = false;

    componentWillLoad() {
        this._setLocales();
        this._parseItems(this.items);
        this._generateColumns();
    }

    componentDidRender() {
        this.hasRendered.emit();
    }

    render() {
        return (
            <Host class="p-table">
                <p-table-container>
                    <p-table-header
                        // quick filters
                        quickFilters={this.quickFilters}
                        activeQuickFilterIdentifier={
                            this.activeQuickFilterIdentifier
                        }
                        onQuickFilter={({ detail }) =>
                            this.quickFilter.emit(detail)
                        }
                        // search
                        enableSearch={this.enableSearch}
                        query={this.query}
                        onQueryChange={({ detail }) =>
                            this.queryChange.emit(detail)
                        }
                        // filter button
                        enableFilter={this.enableFilter}
                        selectedFiltersAmount={this.selectedFiltersAmount}
                        filterButtonTemplate={this.filterButtonTemplate}
                        onFilter={() => this.filter.emit()}
                        // edit button
                        enableEdit={this.enableEdit}
                        canEdit={!!this.selectedRows?.length}
                        editButtonTemplate={this.editButtonTemplate}
                        onEdit={() => this.edit.emit()}
                        itemsSelectedAmount={this.selectedRows?.length}
                    ></p-table-header>

                    {this._getHeader()}
                    <div class="flex flex-col">{this._getRows()}</div>

                    <p-table-footer
                        // overall
                        hideOnSinglePage={this.hideOnSinglePage}
                        // page size select
                        enablePageSize={this.enablePageSize}
                        pageSize={this.pageSize}
                        pageSizeOptions={this.pageSizeOptions}
                        onPageSizeChange={({ detail }) =>
                            this.pageSizeChange.emit(detail)
                        }
                        // pagination
                        enablePagination={this.enablePagination}
                        page={this.page}
                        total={this.total}
                        onPageChange={({ detail }) =>
                            this.pageChange.emit(detail)
                        }
                        // export
                        enableExport={this.enableExport}
                        onExport={() => this.export.emit()}
                    ></p-table-footer>
                </p-table-container>
            </Host>
        );
    }

    @Listen('localeChanged', { target: 'body' })
    private async _setLocales(): Promise<void> {
        this._locales = await getLocaleComponentStrings(this._el);
    }

    @Listen('tableDefinitionChanged', { target: 'body' })
    onTableDefinitionUpdated() {
        this._generateColumns();
    }

    @Listen('keydown', { target: 'document' })
    keyDown({ key }) {
        if (key !== 'Control' || this._ctrlDown === true) {
            return;
        }

        this._ctrlDown = true;
    }

    @Listen('keyup', { target: 'document' })
    keyUp({ key }) {
        if (key !== 'Control' || this._ctrlDown === false) {
            return;
        }

        this._ctrlDown = false;
    }

    @Listen('visibilitychange', { target: 'document' })
    visibilityChange() {
        if (document.visibilityState !== 'hidden' || this._ctrlDown === false) {
            return;
        }

        this._ctrlDown = false;
    }

    @Watch('items')
    private _parseItems(items: string) {
        if (!items) {
            this._items = [];
            return;
        }

        if (Array.isArray(items)) {
            this._items = items;
            return;
        }

        this._items = JSON.parse(items);
    }

    private _generateColumns() {
        const definitions = this._el.querySelectorAll('p-table-column');
        this._columns = Array.from(definitions);
    }

    private _getHeader() {
        return (
            <p-table-row variant="header">
                {this._columns.map((col: TableColumn, index) => (
                    <p-table-cell
                        definition={col}
                        value={col.name}
                        variant="header"
                        checkbox={this._getCheckbox(index, null, 'header')}
                        index={index}
                    ></p-table-cell>
                ))}
            </p-table-row>
        );
    }

    private _getRows() {
        if (this.loading) {
            return Array.from(
                {
                    length: this.amountOfLoadingRows,
                },
                (_, i) => (
                    <p-table-row
                        enableHover={
                            this.enableRowSelection || this.enableRowClick
                        }
                    >
                        {this._getLoadingColumns(i)}
                    </p-table-row>
                )
            );
        }

        if (!this._items.length) {
            return this._getEmptyState();
        }

        return this._items.map((item, index) => (
            <p-table-row
                enableHover={this.enableRowSelection || this.enableRowClick}
                onClick={(ev) => this._rowClick(ev, index)}
            >
                {this._getRowColumns(item, index)}
            </p-table-row>
        ));
    }

    private _getRowColumns(item, index) {
        return this._columns.map((col: TableColumn, colIndex) => {
            return (
                <p-table-cell
                    definition={col}
                    item={item}
                    checkbox={this._getCheckbox(colIndex, index)}
                    index={colIndex}
                    rowIndex={index}
                ></p-table-cell>
            );
        });
    }

    private _getLoadingColumns(index) {
        return this._columns.map((col: TableColumn, colIndex) => {
            return (
                <p-table-cell
                    definition={col}
                    variant="loading"
                    checkbox={this._getCheckbox(colIndex, index, 'loading')}
                    index={colIndex}
                    rowIndex={index}
                ></p-table-cell>
            );
        });
    }

    private _getCheckbox(
        index,
        rowIndex,
        variant: 'header' | 'default' | 'loading' = 'default'
    ) {
        if (!this.enableRowSelection || !this.selectionKey || index !== 0) {
            return;
        }

        if (variant === 'loading') {
            return <p-loader variant="ghost" class="rounded w-6 h-6" />;
        }

        if (variant === 'header') {
            return (
                <input
                    class="p-input"
                    type="checkbox"
                    onChange={(ev) => this._selectAllChange(ev)}
                    checked={this._selectionContainsAll()}
                    indeterminate={this._selectionIndeterminate()}
                />
            );
        }

        const item = this._items[rowIndex];

        return (
            <input
                class="p-input"
                type="checkbox"
                onChange={(ev) => this._checkboxChange(ev?.target, rowIndex)}
                disabled={this.canSelectKey && !item[this.canSelectKey]}
                checked={this._selectionContains(item, rowIndex)}
            />
        );
    }

    private _getEmptyState() {
        if (this.query?.length || this.selectedFiltersAmount) {
            return (
                <div class="flex flex-col items-center text-center py-24 max-w-[20rem] self-center">
                    <p-illustration variant="empty-state-search" class="mb-6" />
                    <p class="font-semibold text-storm-default">
                        {this.emptyStateFilteredHeader()}
                    </p>
                    <p class="text-sm text-storm-medium mb-14">
                        {this.emptyStateFilteredContent()}
                    </p>
                </div>
            );
        }

        return (
            <div class="flex flex-col items-center text-center py-24 max-w-[20rem] self-center">
                <p-illustration
                    variant="empty-state-overview"
                    class="cursor-pointer mb-6"
                    onClick={() => this.emptyStateActionClick.emit(null)}
                />
                <p class="font-semibold text-storm-default">
                    {this.emptyStateHeader()}
                </p>
                <p class="text-sm text-storm-medium mb-6">
                    {this.emptyStateContent()}
                </p>
                <p-button
                    variant="secondary"
                    icon="plus"
                    size="small"
                    onClick={() => this.emptyStateActionClick.emit(null)}
                >
                    {this.emptyStateAction()}
                </p-button>
            </div>
        );
    }

    private _selectAllChange($event: any) {
        if (!this.enableRowSelection) {
            return;
        }

        const value = this._getCheckedValue($event.target);
        if (value) {
            const toAdd = [];
            for (let i = 0; i < this._items.length; i++) {
                const row = this._items[i];
                if (this.canSelectKey && !row[this.canSelectKey]) {
                    continue;
                }

                if (this._selectionContains(row, i)) {
                    continue;
                }

                toAdd.push(row);
                this.rowSelected.emit(row);
            }

            this.selectedRows = [...this.selectedRows, ...toAdd];
            this.selectedRowsChange.emit(this.selectedRows);
            return;
        }

        for (let i = 0; i < this.selectedRows.length; i++) {
            const value = this.selectedRows[i];
            const row = this._items.find(
                (d) =>
                    this._getSelectionValue(d, i) ===
                    this._getSelectionValue(value, i)
            );

            if (!row) {
                continue;
            }

            this.rowDeselected.emit(row);
        }

        this.selectedRows = [];
        this.selectedRowsChange.emit(this.selectedRows);
    }

    private _checkboxChange(target: any, index: number) {
        if (!this.enableRowSelection) {
            return;
        }

        const row = this._items[index];

        if (this.canSelectKey && !row[this.canSelectKey]) {
            target.checked = false;
            return;
        }

        const value = this._getCheckedValue(target);
        if (value) {
            this.selectedRows = [...this.selectedRows, row];
            this.selectedRowsChange.emit(this.selectedRows);
            this.rowSelected.emit(row);
            return;
        }

        const indexOfToRemove = this._selectionContains(row, index, true);

        // we need to do this, because splice does not trigger the selection setter.
        const selection = [...this.selectedRows];
        selection.splice(indexOfToRemove, 1);
        this.selectedRows = selection;
        this.selectedRowsChange.emit(this.selectedRows);
        this.rowDeselected.emit(row);
    }

    private _getCheckedValue(target: any) {
        return target?.checked;
    }

    private _getSelectionValue(row: any, index: number) {
        return this.selectionKey ? row?.[this.selectionKey] || index : index;
    }

    private _selectionContains(row, index, returnIndex = false): any {
        const returnValue = this.selectedRows.findIndex(
            (item) =>
                this._getSelectionValue(row, index) ===
                this._getSelectionValue(item, index)
        );
        return !returnIndex ? returnValue >= 0 : returnValue;
    }

    private _selectionContainsAll() {
        let returnValue = true;
        if (!this._items?.length) {
            return false;
        }

        for (let i = 0; i < this._items?.length; i++) {
            const item = this._items[i];
            const contains = this._selectionContains(item, i);

            if (!contains) {
                returnValue = false;
                break;
            }
        }

        return returnValue;
    }

    private _selectionIndeterminate() {
        if (!this._items?.length || !this.selectedRows?.length) {
            return false;
        }

        let containsCount = 0;
        for (let i = 0; i < this._items?.length; i++) {
            const item = this._items[i];
            const contains = this._selectionContains(item, i);

            if (contains) {
                containsCount++;
            }
        }

        return containsCount > 0 && containsCount !== this._items.length;
    }

    private _rowClick($event, index) {
        const target = $event.target;

        if (
            target.tagName.toLowerCase() === 'input' ||
            target.type === 'checkbox'
        ) {
            return;
        }

        const row = this._findRow($event.target);

        if (this.enableRowClick) {
            const action = this._findRowAction($event.target);

            if (action) {
                return;
            }

            const item = this._items[index];
            this.rowClick.emit({
                item,
                ctrlDown: this._ctrlDown,
            });
            return;
        }

        if (!this.enableRowSelection) {
            return;
        }

        const checkbox = row?.querySelector('input[type="checkbox"]');

        if (!checkbox) {
            return;
        }

        checkbox.checked = !checkbox.checked;
        this._checkboxChange(checkbox, index);
    }

    private _findRow(el: HTMLElement) {
        if (!el) {
            return el;
        }

        if (el?.tagName?.toLowerCase() === 'p-table-row') {
            return el;
        }

        return this._findRow(el?.parentElement);
    }

    private _findRowAction(el: HTMLElement) {
        if (!el) {
            return null;
        }

        if (
            el.getAttribute('data-is-action') !== null &&
            el.getAttribute('data-is-action') !== 'false'
        ) {
            return el;
        }

        if (el?.tagName?.toLowerCase() === 'p-table-row') {
            return null;
        }

        return this._findRowAction(el?.parentElement);
    }
}
