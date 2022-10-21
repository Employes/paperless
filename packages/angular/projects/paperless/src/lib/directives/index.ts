export * from './p-page-size-select.directive';
export * from './p-pagination.directive';
export * from './p-table-definition.directive';
export * from './p-table-footer.directive';
export * from './p-table-header.directive';
export * from './p-table.directive';

import { PageSizeSelectDirective } from './p-page-size-select.directive';
import { PaginationDirective } from './p-pagination.directive';
import { TableDefinition } from './p-table-definition.directive';
import { TableFooterDirective } from './p-table-footer.directive';
import { TableHeaderDirective } from './p-table-header.directive';
import { TableDirective } from './p-table.directive';

export const CUSTOM_DIRECTIVES = [
    PaginationDirective,
    PageSizeSelectDirective,
    TableFooterDirective,
    TableHeaderDirective,
    TableDirective,
    TableDefinition,
];
