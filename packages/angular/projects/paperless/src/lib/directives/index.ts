export * from './p-cropper.directive';
export * from './p-datepicker.directive';
export * from './p-page-size-select.directive';
export * from './p-pagination.directive';
export * from './p-select.directive';

import { CropperDirective } from './p-cropper.directive';
import { DatepickerDirective } from './p-datepicker.directive';
import { PageSizeSelectDirective } from './p-page-size-select.directive';
import { PaginationDirective } from './p-pagination.directive';
import { SelectDirective } from './p-select.directive';

export const DIRECTIVES = [
    PaginationDirective,
    PageSizeSelectDirective,
    SelectDirective,
    DatepickerDirective,
    CropperDirective,
];
