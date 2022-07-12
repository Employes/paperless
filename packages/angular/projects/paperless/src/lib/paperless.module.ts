import { NgModule } from '@angular/core';
import { CUSTOM_DIRECTIVES } from './directives';
import { DIRECTIVES } from './stencil';

@NgModule({
    declarations: [...DIRECTIVES, ...CUSTOM_DIRECTIVES],
    exports: [...DIRECTIVES, ...CUSTOM_DIRECTIVES],
})
export class PaperlessModule {}
