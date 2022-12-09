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
} from '@stencil/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { QuickFilter } from '../../../types/table';
import {
    formatTranslation,
    getLocaleComponentStrings,
} from '../../../utils/localization';

export type templateFunc = () => string;
export type buttonTemplateFunc = (amount: number) => string;

@Component({
    tag: 'p-table-header',
    styleUrl: 'table-header.component.scss',
    shadow: true,
})
export class TableHeader {
    private _defaultFilterButtonTemplate: templateFunc = () =>
        formatTranslation(this._locales.filter);
    private _defaultEditButtonTemplate: buttonTemplateFunc = (amount: number) =>
        formatTranslation(
            amount === 0
                ? this._locales.edit
                : amount === 1
                ? this._locales.edit_single
                : this._locales.edit_plural,
            { amount }
        );

    /**
     * Quick filters to show
     */
    @Prop() quickFilters: QuickFilter[] = [];

    /**
     * Active quick filter identifier
     */
    @Prop() activeQuickFilterIdentifier: string;

    /**
     * Wether we want to show loading state
     */
    @Prop() loading: boolean = false;

    /**
     * Wether to show the search input
     */
    @Prop() enableSearch: boolean = true;

    /**
     * The amount of items that are selected
     */
    @Prop() itemsSelectedAmount: number = 0;

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
    @Prop() filterButtonTemplate: templateFunc =
        this._defaultFilterButtonTemplate;

    /**
     * Wether to show the edit button
     */
    @Prop() enableEdit: boolean = true;

    /**
     * Wether to enable the edit button
     */
    @Prop({ mutable: true }) canEdit: boolean = false;

    /**
     * The template for the edit button text
     */
    @Prop() editButtonTemplate: buttonTemplateFunc =
        this._defaultEditButtonTemplate;

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

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    /**
     * Locales used for this component
     */
    @State() private _locales: any = {};

    private _queryObserver = new Subject<string>();

    componentWillLoad() {
        this._setLocales();
    }

    componentDidLoad() {
        this._queryObserver
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((value) => this.queryChange.emit(value));
    }

    render() {
        const activeQuickFilter = this.quickFilters.find(
            (f) => f.identifier === this.activeQuickFilterIdentifier
        );
        const mobileTotal =
            (this.selectedFiltersAmount || 0) +
            (activeQuickFilter?.default ? 0 : 1);

        return (
            <Host class="p-table-header">
                {this.loading && (
                    <p-loader
                        variant="ghost"
                        class="hidden desktop-xs:flex rounded w-3/4 h-8"
                    ></p-loader>
                )}

                {!this.loading && this.quickFilters.length > 0 && (
                    <p-segment-container class="hidden desktop-xs:flex">
                        {this.quickFilters.map((item) => (
                            <p-segment-item
                                active={
                                    item.identifier ===
                                    this.activeQuickFilterIdentifier
                                }
                                onClick={() => this.quickFilter.emit(item)}
                            >
                                {typeof item.text === 'string'
                                    ? item.text
                                    : item.text()}{' '}
                                {item?.count >= 0 ? `(${item.count})` : ''}
                            </p-segment-item>
                        ))}
                    </p-segment-container>
                )}

                <div class="flex flex-col desktop-xs:flex-row gap-4 justify-end justify-self-end">
                    {this.enableSearch && (
                        <p-input-group icon="search" size="small">
                            <input
                                type="text"
                                slot="input"
                                placeholder="Zoeken..."
                                value={this.query}
                                onInput={(ev) =>
                                    this._queryObserver.next(
                                        (ev.target as HTMLInputElement).value
                                    )
                                }
                            />
                        </p-input-group>
                    )}

                    {this.enableFilter && (
                        <p-button
                            icon="filter"
                            variant="secondary"
                            size="small"
                            class="w-full desktop-xs:w-auto"
                            onClick={() => this.filter.emit()}
                        >
                            {this.filterButtonTemplate
                                ? this.filterButtonTemplate()
                                : this._defaultFilterButtonTemplate()}
                            {this.selectedFiltersAmount &&
                                this._getLabel(this.selectedFiltersAmount)}
                            {mobileTotal > 0 &&
                                this._getLabel(mobileTotal, 'mobile')}
                        </p-button>
                    )}

                    {this.enableEdit && this._buttonTemplate()}
                </div>

                {this.enableEdit && this.canEdit && (
                    <div class="fixed bottom-0 left-0 w-full p-4 bg-white border border-solid border-transparent border-t-mystic-dark block desktop-xs:hidden">
                        {this._buttonTemplate(true)}
                    </div>
                )}
            </Host>
        );
    }

    @Listen('localeChanged', { target: 'body' })
    private async _setLocales(): Promise<void> {
        this._locales = await getLocaleComponentStrings(this._el);
    }

    private _buttonTemplate(mobile = false) {
        return (
            <p-button
                class={mobile ? 'w-full' : 'hidden desktop-xs:flex'}
                icon="pencil"
                size="small"
                disabled={!this.canEdit}
                onClick={() => this.edit.emit()}
            >
                {this.editButtonTemplate
                    ? this.editButtonTemplate(
                          mobile ? this.itemsSelectedAmount : 0
                      )
                    : this._defaultEditButtonTemplate(
                          mobile ? this.itemsSelectedAmount : 0
                      )}
            </p-button>
        );
    }

    private _getLabel(amount, variant: 'mobile' | 'default' = 'default') {
        return (
            <p-label
                size="small"
                variant="negative"
                behavior="text"
                class={`ml-1 ${
                    variant === 'default'
                        ? 'hidden desktop-xs:flex'
                        : 'flex desktop-xs:hidden'
                }`}
            >
                {amount}
            </p-label>
        );
    }
}
