import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({})
export class BaseValueAccessor implements ControlValueAccessor {
    private onChange: (value: any) => void = () => {
        /**/
    };

    private onTouched: () => void = () => {
        /**/
    };

    protected lastValue: any;

    constructor(protected el: ElementRef) {}

    public writeValue(value: any) {
        this.el.nativeElement.value = this.lastValue =
            value == null ? '' : value;
    }

    public handleChangeEvent(value: any) {
        if (value !== this.lastValue) {
            this.lastValue = value;
            this.onChange(value);
        }
    }

    public registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    @HostListener('focusout')
    private _handleBlurEvent() {
        this.onTouched();
    }
}
