export type QuickFilterTextFunction = () => string;

export interface QuickFilter {
    identifier: string;
    text: string | QuickFilterTextFunction;
    count?: number;
}

export interface RowClickEvent {
    item: any;
    ctrlDown: boolean;
}

export interface TableDefinitionTemplateFuncData {
    value: any;
    item: any;
    index: number;
}

export type TableDefinitionTemplateFunc = (
    data: TableDefinitionTemplateFuncData
) => any;

export interface TableDefinitionSizes {
    default: number;
    tablet?: number;
    'desktop-xs'?: number;
    'desktop-sm'?: number;
    desktop?: number;
    'desktop-lg'?: number;
    'desktop-xl'?: number;
}
