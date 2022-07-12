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

    override registerOnChange(fn: (_: number | null) => void) {
        super.registerOnChange((value) => {
            console.log("We got a change", value)
            fn(value === '' ? null : parseInt(value, 10));
        });
    }
}
