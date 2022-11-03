export * from './p-table-footer.directive';
export * from './p-table-header.directive';
export * from './p-table-ngx.directive';
export * from './p-table.directive';

import { TableFooterDirective } from './p-table-footer.directive';
import { TableHeaderDirective } from './p-table-header.directive';
import { TableNgxDirective } from './p-table-ngx.directive';
import { TableDirective } from './p-table.directive';

export const TABLE_DIRECTIVES = [
    TableFooterDirective,
    TableHeaderDirective,
    TableDirective,
    TableNgxDirective,
];
