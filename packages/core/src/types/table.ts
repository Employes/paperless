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
    default: number;
    tablet?: number;
    'desktop-xs'?: number;
    'desktop-sm'?: number;
    desktop?: number;
    'desktop-lg'?: number;
    'desktop-xl'?: number;
}
