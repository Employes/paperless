import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { DIRECTIVES } from './directives';
import * as MODULES from './modules';
import { PIPES } from './pipes';
import { PaperlessStencilModule } from './stencil.module';

const NGX_PIPES = [DatePipe, CurrencyPipe];

@NgModule({
    imports: [CommonModule, PaperlessStencilModule, ...MODULES],
    declarations: [...DIRECTIVES, ...PIPES],
    exports: [PaperlessStencilModule, ...MODULES, ...DIRECTIVES, ...PIPES],
    providers: [...NGX_PIPES, ...PIPES],
})
export class PaperlessModule {}
