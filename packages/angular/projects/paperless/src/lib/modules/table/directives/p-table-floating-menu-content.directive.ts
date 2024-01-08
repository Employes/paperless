import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[p-table-floating-menu-content]',
})
export class TableFloatingMenuContentDirective {
    constructor(public template: TemplateRef<any>) {}
}
