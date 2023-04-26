export type QuickFilterTextFunction = () => string;

export interface QuickFilter {
    identifier: string;
    text: string | QuickFilterTextFunction;
    count?: number;
    default?: boolean;
}

export interface RowClickEvent {
    item: any;
    ctrlDown: boolean;
}

export interface TableDefinitionData {
    value: any;
    item: any;
    index: number;
    rowIndex: number;
}

export type TableDefinitionTemplateFunc = (data: TableDefinitionData) => any;

export interface TableColumnSizes {
    default: number | 'hidden';
    tablet?: number | 'hidden';
    'desktop-xs'?: number | 'hidden';
    'desktop-sm'?: number | 'hidden';
    desktop?: number | 'hidden';
    'desktop-lg'?: number | 'hidden';
    'desktop-xl'?: number | 'hidden';
}
