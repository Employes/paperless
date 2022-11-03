import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { COMPONENTS } from './components';
import { CUSTOM_DIRECTIVES } from './directives';
import { PIPES } from './pipes';
import { DIRECTIVES } from './stencil';

const NGX_PIPES = [DatePipe, CurrencyPipe];

@NgModule({
    imports: [CommonModule],
    declarations: [
        ...DIRECTIVES,
        ...COMPONENTS,
        ...PIPES,
        ...CUSTOM_DIRECTIVES,
    ],
    exports: [...DIRECTIVES, ...COMPONENTS, ...PIPES, ...CUSTOM_DIRECTIVES],
    providers: [...NGX_PIPES, ...PIPES],
})
export class PaperlessModule {}
