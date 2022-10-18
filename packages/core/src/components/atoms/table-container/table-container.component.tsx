import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'p-table-container',
    styleUrl: 'table-container.component.scss',
    shadow: true,
})
export class TableContainer {
    render() {
        return (
            <Host class="p-table-container">
                <slot />
            </Host>
        );
    }
}
