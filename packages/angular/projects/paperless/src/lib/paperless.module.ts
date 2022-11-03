import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { DIRECTIVES } from './directives';
import { PaperlessTableModule, PaperlessToastModule } from './modules';
import { PIPES } from './pipes';
import { DIRECTIVES as STENCIL_DIRECTIVES } from './stencil';

const NGX_PIPES = [DatePipe, CurrencyPipe];

@NgModule({
    imports: [CommonModule, PaperlessTableModule, PaperlessToastModule],
    declarations: [...DIRECTIVES, ...PIPES, ...STENCIL_DIRECTIVES],
    exports: [...DIRECTIVES, ...PIPES, ...STENCIL_DIRECTIVES],
    providers: [...NGX_PIPES, ...PIPES],
})
export class PaperlessModule {}
