import { ValueAccessorConfig } from '@stencil/angular-output-target';
import { paginationValueAccessor } from './components/molecules/pagination/pagination.value-accessor';

export const valueAccessorConfigs: ValueAccessorConfig[] = [
    // molecules
    paginationValueAccessor,
];
