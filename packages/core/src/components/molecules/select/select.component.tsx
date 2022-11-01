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
import { childOf } from '../../../utils';

@Component({
    tag: 'p-select',
    styleUrl: 'select.component.scss',
    shadow: false,
})
export class Select {
    /**
     * The items to show in the dropdown
     */
    @Prop() items: string | any[];

    /**
     * The current query
     */
    @Prop() query: string;

    /**
     * The placeholder of the input
     */
    @Prop() placeholder: string;

    /**
     * The placeholder of the input when auto completing
     */
    @Prop() autocompletePlaceholder: string;

    /**
     * The current value
     */
    @Prop() value: any;

    /**
     * The key of the object to display
     */
    @Prop() displayKey: string = 'text';

    /**
     * The key of the object to return
     */
    @Prop() valueKey: string = 'value';

    /**
     * The key of the object to display
     */
    @Prop() queryKey?: string;

    /**
     * Wether to automatically select the first item
     */
    @Prop() autoSelectFirst: boolean = true;

    /**
     * Wether to enable autocomplete
     */
    @Prop() enableAutocomplete: boolean = true;

    /**
     * Event when the query of the autocomplete changes
     */
    @Event() queryChange: EventEmitter<string>;

    /**
     * Event when the value changes
     */
    @Event() valueChange: EventEmitter<any>;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    @State() private _showDropdown: any = false;
    @State() private _selectedItem: any = null;

    private _isAutoCompleting: boolean = false;

    private _inputRef: HTMLInputElement;

    get _items() {
        if (!this.items) {
            return [];
        }

        let items =
            typeof this.items === 'string'
                ? JSON.parse(this.items)
                : this.items;

        if (typeof items?.[0] === 'string') {
            this.displayKey = 'text';
            this.valueKey = 'value';

            items = items.map((str) => ({
                value: str,
                text: str,
            }));
        }

        if (this._isAutoCompleting && this.query?.length) {
            items = items.filter((item) => {
                if (this.queryKey) {
                    return this._checkvalue(this.queryKey, item);
                }

                return (
                    this._checkvalue(this.valueKey, item) ||
                    this._checkvalue(this.displayKey, item)
                );
            });
        }

        return items;
    }

    get _displayValue() {
        if (this._isAutoCompleting) {
            return this.query;
        }

        return this._selectedItem?.[this.displayKey];
    }

    get _placeholder() {
        return this._isAutoCompleting && this.autocompletePlaceholder?.length
            ? this.autocompletePlaceholder
            : this.placeholder;
    }

    componentDidLoad() {
        if (this.value) {
            const value = isNaN(this.value)
                ? this.value
                : parseInt(this.value, 10);
            this._selectedItem = this._items.find(
                (i) => i?.[this.valueKey] === value
            );

            return;
        }

        if (this.autoSelectFirst) {
            this._selectedItem = this._items?.[0];
        }
    }

    render() {
        return (
            <Host class="p-select">
                {JSON.stringify(this._showDropdown)}
                <p-dropdown
                    disableTriggerClick={true}
                    calculateWidth={true}
                    insideClick={true}
                    show={this._showDropdown}
                >
                    <p-input-group
                        slot="trigger"
                        icon="chevron"
                        iconPosition="end"
                        focused={this._showDropdown}
                    >
                        <input
                            slot="input"
                            type="text"
                            placeholder={this._placeholder}
                            value={this._displayValue}
                            class="p-input cursor-pointer"
                            onFocus={() => this._onFocus()}
                            onMouseDown={(ev) => this._onMouseDown(ev)}
                            onClick={() => this._onClick()}
                            onInput={(ev) => this._onChange(ev)}
                            ref={(ref) => (this._inputRef = ref)}
                        />
                    </p-input-group>
                    <div slot="items">
                        {this._items.map((item) => (
                            <p-dropdown-menu-item
                                onClick={() => this._selectValue(item)}
                            >
                                {item[this.displayKey]}
                            </p-dropdown-menu-item>
                        ))}
                    </div>
                </p-dropdown>
            </Host>
        );
    }

    @Listen('click', { target: 'document', capture: true })
    protected documentClickHandler({ target }) {
        if (!this._showDropdown || childOf(target, this._el)) {
            return;
        }

        this._showDropdown = false;
    }

    private _selectValue(item) {
        this._selectedItem = item;
        const value = item[this.valueKey];

        this.value = value;
        this.valueChange.emit(this.value);

        this._onBlur(true);
    }

    private _onFocus() {
        if (!this.enableAutocomplete) {
            this._inputRef.blur();
            if (!this._showDropdown) {
                this._showDropdown = true;
            }
            return;
        }

        this._isAutoCompleting = true;
        this._showDropdown = true;
    }

    private _onMouseDown(ev) {
        if (this.enableAutocomplete) {
            return;
        }

        ev.preventDefault();
    }

    private _onClick() {
        if (this.enableAutocomplete) {
            return;
        }

        this._showDropdown = true;
    }

    private _onBlur(force = false) {
        if (!this.enableAutocomplete && !force) {
            return;
        }

        this._isAutoCompleting = false;
        this._showDropdown = false;
    }

    private _onChange(ev) {
        if (!this._isAutoCompleting) {
            return;
        }

        this.query = ev.target.value;
        this.queryChange.emit(this.query);
    }

    private _checkvalue(key, item) {
        return item?.[key]?.toString()?.indexOf(this.query) >= 0;
    }
}
