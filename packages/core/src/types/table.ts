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