import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../base';

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: 'p-pagination',
    host: {
        '(pageChange)': 'handleChangeEvent($event.target.page)',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: PaginationDirective,
            multi: true,
        },
    ],
})
export class PaginationDirective extends ValueAccessor {
    constructor(el: ElementRef) {
        super(el);
    }

    override writeValue(value: any) {
        this.el.nativeElement.page = this.lastValue =
            value == null ? '' : value;
    }

    override registerOnChange(fn: (_: number | null) => void) {
        super.registerOnChange((value) => fn(value === '' ? null : parseInt(value, 10)));
    }
}
