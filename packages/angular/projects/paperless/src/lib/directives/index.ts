export * from './p-page-size-select.directive';
export * from './p-pagination.directive';
export * from './p-select.directive';
export * from './p-table-footer.directive';
export * from './p-table-header.directive';
export * from './p-table-ngx.directive';
export * from './p-table.directive';

import { PageSizeSelectDirective } from './p-page-size-select.directive';
import { PaginationDirective } from './p-pagination.directive';
import { SelectDirective } from './p-select.directive';
import { TableFooterDirective } from './p-table-footer.directive';
import { TableHeaderDirective } from './p-table-header.directive';
import { TableNgxDirective } from './p-table-ngx.directive';
import { TableDirective } from './p-table.directive';

// Custom directives
export const CUSTOM_DIRECTIVES = [
    PaginationDirective,
    PageSizeSelectDirective,
    TableFooterDirective,
    TableHeaderDirective,
    TableDirective,
    TableNgxDirective,
    SelectDirective,
];
