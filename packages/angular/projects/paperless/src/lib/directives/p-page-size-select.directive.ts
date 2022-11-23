import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: 'p-page-size-select',
    host: {
        '(sizeChange)': 'handleChangeEvent($event.detail)',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: PageSizeSelectDirective,
            multi: true,
        },
    ],
})
export class PageSizeSelectDirective extends BaseValueAccessor {
    constructor(el: ElementRef) {
        super(el);
    }

    override writeValue(value: any) {
        this.el.nativeElement.page = this.lastValue =
            value == null ? 12 : value;
    }

    override registerOnChange(fn: (_: number | null) => void) {
        super.registerOnChange((value) => fn(parseInt(value, 10)));
    }
}
