import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaperlessStencilModule } from '../../stencil.module';
import { TABLE_COMPONENTS } from './components';
import { TABLE_DIRECTIVES } from './directives';

@NgModule({
    imports: [CommonModule, PaperlessStencilModule],
    declarations: [...TABLE_COMPONENTS, ...TABLE_DIRECTIVES],
    exports: [...TABLE_COMPONENTS, ...TABLE_DIRECTIVES],
})
export class PaperlessTableModule {}
