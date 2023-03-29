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
import {
    format,
    isAfter,
    isBefore,
    isSameDay,
    isValid,
    parse,
    startOfDay,
} from 'date-fns';
import { childOf } from '../../../utils';

@Component({
    tag: 'p-datepicker',
    styleUrl: 'datepicker.component.scss',
    shadow: false,
})
export class Datepicker {
    /**
     * The placeholder of the input
     */
    @Prop() placeholder: string;

    /**
     * The current value
     */
    @Prop() value: Date | null | undefined;

    /**
     * Wethter to automatically preselect today
     */
    @Prop() preselectToday: boolean = false;

    /**
     * Disabled dates
     */
    @Prop() disabledDates?: Array<Date | 'string'> | string;

    /**
     * Min date
     */
    @Prop() minDate?: Date | 'string';

    /**
     * Max date
     */
    @Prop() maxDate?: Date | 'string';

    /**
     * Wether to disable the weekends
     */
    @Prop() disableWeekends: boolean = false;

    /**
     * The mode of the datepicker
     */
    @Prop() mode: 'year' | 'month' | 'day' = 'day';

    /**
     * Event when the value changes
     */
    @Event() valueChange: EventEmitter<any>;

    /**
     * The display & parse format to use
     */
    @Prop() format: string = 'dd-MM-yyyy';

    /**
     * The size of the input group used by the datepicker
     */
    @Prop() size: 'small' | 'medium' = 'medium';

    /**
     * The prefix of the input group used by the datepicker
     */
    @Prop() prefix: string;

    /**
     * The label of the input group used by the datepicker
     */
    @Prop() label: string;

    /**
     * The helper of the input group used by the datepicker
     */
    @Prop() helper: string;

    /**
     * The helper of the input group used by the datepicker
     */
    @Prop({ reflect: true }) error: string;

    /**
     * Wether the input group is disabled used by the datepicker
     */
    @Prop({ reflect: true }) disabled: boolean = false;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    @State() private _showDropdown: any = false;
    @State() private _value: Date;
    @State() private _minDate: Date;
    @State() private _maxDate: Date;
    @State() private _disabledDates: Date[] = [];

    private _onInputTimeout: NodeJS.Timeout;

    private _defaultFormats = {
        year: 'yyyy',
        month: 'LLLL, yyyy',
        day: 'dd-MM-yyyy',
    };

    get formattedDate() {
        if (!this._value) {
            return;
        }

        return format(this._value, this.format);
    }

    @Watch('value')
    private _parseValue(value: string | Date) {
        console.log('[Datepicker] parse value', value, this._el);
        if (!value && this.preselectToday) {
            value = new Date();
        }

        if (typeof value === 'string') {
            value = new Date(value);
        }

        this._setValue(value);
    }

    @Watch('minDate')
    protected parseMinDate(minDate: string | Date) {
        if (typeof minDate === 'string') {
            minDate = new Date(minDate);
        }

        if (!isValid(minDate)) {
            return;
        }

        this._minDate = minDate;

        if (isBefore(this._value, this._minDate)) {
            this._setValue(null);
        }
    }

    @Watch('maxDate')
    protected parseMaxDate(maxDate: string | Date) {
        if (typeof maxDate === 'string') {
            maxDate = new Date(maxDate);
        }

        if (!isValid(maxDate)) {
            return;
        }

        this._maxDate = maxDate;

        if (isAfter(this._value, this._maxDate)) {
            this._setValue(null);
        }
    }

    @Watch('disabledDates')
    protected parseDisabledDates(disabledDates: Array<string | Date> | string) {
        if (typeof disabledDates === 'string') {
            disabledDates = JSON.parse(disabledDates);
        }

        if (!disabledDates || !Array.isArray(disabledDates)) {
            return;
        }

        // normalize all to date
        this._disabledDates = disabledDates
            .map((date) => {
                if (typeof date === 'string') {
                    return new Date(date);
                }

                return date;
            })
            .filter((date) => isValid(date));

        if (this._isDisabledDay(this._value)) {
            this._setValue(null);
        }
    }

    componentWillLoad() {
        if (this.disabledDates) {
            this.parseDisabledDates(this.disabledDates);
        }

        if (this.minDate) {
            this.parseMinDate(this.minDate);
        }

        if (this.maxDate) {
            this.parseMaxDate(this.maxDate);
        }

        if (
            this.mode !== 'day' &&
            this.format === this._defaultFormats['day']
        ) {
            this.format = this._defaultFormats[this.mode];
        }

        this.parseValue(this.value);
    }

    render() {
        return (
            <Host class="p-datepicker">
                <p-dropdown
                    disableTriggerClick={true}
                    applyMaxWidth={false}
                    applyFullWidth={false}
                    insideClick={true}
                    show={this._showDropdown}
                >
                    <p-input-group
                        slot="trigger"
                        icon="calendar"
                        iconPosition="start"
                        size={this.size}
                        prefix={this.prefix}
                        label={this.label}
                        helper={this.helper}
                        error={this.error}
                        disabled={this.disabled}
                        focused={this._showDropdown}
                    >
                        <input
                            slot="input"
                            type="text"
                            placeholder={this.placeholder}
                            value={this.formattedDate}
                            class="p-input cursor-pointer"
                            onFocus={() => this._onFocus()}
                            onInput={(ev) => this._onInput(ev)}
                        />
                    </p-input-group>
                    <div slot="items">
                        <p-calendar
                            variant="embedded"
                            value={this._value}
                            onValueChange={({ detail }) =>
                                (this.value = detail)
                            }
                            preselectToday={this.preselectToday}
                            disabledDates={this.disabledDates}
                            minDate={this.minDate}
                            maxDate={this.maxDate}
                            disableWeekends={this.disableWeekends}
                            mode={this.mode}
                        />
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

    private _onFocus() {
        this._showDropdown = true;
    }

    private _onBlur() {
        this._showDropdown = false;
    }

    private _onInput(ev) {
        if (this._onInputTimeout) {
            clearTimeout(this._onInputTimeout);
            this._onInputTimeout = null;
        }

        this._onInputTimeout = setTimeout(() => {
            const value = parse(ev.target.value, this.format, new Date());
            if (!isValid(value)) {
                return;
            }

            this._setValue(value, false);
        }, 250);
    }

    private _setValue(value: Date | null, blur = true) {
        if (value === null) {
            this._value = null;
            this.valueChange.emit(null);
            return;
        }

        if (!isValid(value)) {
            return;
        }

        if (this._isDisabledDay(value)) {
            return;
        }

        value = startOfDay(value);
        const isSameValue = isSameDay(value, this._value);

        if (isSameValue) {
            return;
        }

        if (blur) {
            this._onBlur();
        }

        this._value = value;
        this.valueChange.emit(value);
    }

    private _isDisabledDay(day: Date) {
        return (
            isBefore(day, this._minDate) ||
            (isAfter(day, this._maxDate) && !isSameDay(day, this._maxDate)) ||
            this._disabledDates.findIndex((date) => isSameDay(date, day)) >= 0
        );
    }
}
