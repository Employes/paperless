import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TOAST_COMPONENTS } from './components';
import { TOAST_SERVICES } from './services';

@NgModule({
    imports: [CommonModule],
    declarations: [...TOAST_COMPONENTS],
    exports: [...TOAST_COMPONENTS],
    providers: [...TOAST_SERVICES],
})
export class PaperlessToastModule {}
