import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

export interface templateFuncData {
    value: any;
    item: any;
    index: number;
}

export type templateFunc = (data: templateFuncData) => any;

export interface TableDefinitionSizes {
    default: number;
    tablet?: number;
    'desktop-xs'?: number;
    'desktop-sm'?: number;
    desktop?: number;
    'desktop-lg'?: number;
    'desktop-xl'?: number;
}

@Component({
    tag: 'p-table-definition',
    shadow: true,
})
export class TableDefinition {
    /**
     * The template for the data view
     */
    @Prop() template: templateFunc = ({ value }) => value;

    /**
     * The path of the value of the item you want to display
     */
    @Prop({ reflect: true }) path: string;

    /**
     * The type of the column
     */
    @Prop({ reflect: true }) type: 'td' | 'th' = 'td';

    /**
     * The name of the column
     */
    @Prop({ reflect: true }) name: string;

    /**
     * The alignment of the column
     */
    @Prop({ reflect: true }) align: 'start' | 'center' | 'end' = 'start';

    /**
     * The sizes of the column
     */
    @Prop() sizes: 'auto' | number | TableDefinitionSizes = 'auto';

    /**
     * Event to let the table know it has to re render
     */
    @Event({ bubbles: true, composed: true })
    tableDefinitionChanged: EventEmitter<boolean>;

    componentDidUpdate() {
        console.log('Component did update');
        this.tableDefinitionChanged.emit(true);
    }

    render() {
        return <Host />;
    }
}
