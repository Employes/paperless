import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'p-divider',
    styleUrl: 'divider.component.scss',
    shadow: true,
})
export class Divider {
    render() {
        return <Host class="p-divider"></Host>;
    }
}
