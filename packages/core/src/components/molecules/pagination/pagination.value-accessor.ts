import { ValueAccessorConfig } from '@stencil/angular-output-target';

export const paginationValueAccessor: ValueAccessorConfig = {
    elementSelectors: ['p-pagination'],
    event: 'pageChange',
    targetAttr: 'page',
    type: 'number',
};
