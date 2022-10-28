import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import { TableDefinitionSizes } from '../../../types/table';

@Component({
    tag: 'p-table-definition',
})
export class TableDefinition {
    /**
     * The path of the value of the item you want to display
     */
    @Prop({ reflect: true, mutable: true }) path: string;

    /**
     * The type of the column
     */
    @Prop({ reflect: true, mutable: true }) type: 'td' | 'th' = 'td';

    /**
     * The name of the column
     */
    @Prop({ reflect: true, mutable: true }) name: string;

    /**
     * Wether the column should use the slot
     */
    @Prop({ reflect: true, mutable: true }) useSlot: boolean = false;

    /**
     * The alignment of the column
     */
    @Prop({ reflect: true, mutable: true }) align: 'start' | 'center' | 'end' =
        'start';

    /**
     * The sizes of the column
     */
    @Prop({ mutable: true }) sizes: 'auto' | number | TableDefinitionSizes =
        'auto';

    /**
     * Event to let the table know it has to re render
     */
    @Event({ bubbles: true, composed: true })
    tableDefinitionChanged: EventEmitter<boolean>;

    componentDidUpdate() {
        this.tableDefinitionChanged.emit(true);
    }

    render() {
        return;
    }
}
