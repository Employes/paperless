import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'p-table-body',
    styleUrl: 'table-body.component.scss',
    shadow: true,
})
export class TableBody {
    render() {
        return (
            <Host class="p-table-body">
                <slot />
            </Host>
        );
    }
}
