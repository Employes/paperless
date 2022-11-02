import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { COMPONENTS } from './components';
import { CUSTOM_DIRECTIVES } from './directives';
import { DIRECTIVES } from './stencil';

@NgModule({
    imports: [CommonModule],
    declarations: [...DIRECTIVES, ...COMPONENTS, ...CUSTOM_DIRECTIVES],
    exports: [...DIRECTIVES, ...COMPONENTS, ...CUSTOM_DIRECTIVES],
})
export class PaperlessModule {}
