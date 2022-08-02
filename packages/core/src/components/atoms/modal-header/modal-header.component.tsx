import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'p-modal-header',
    styleUrl: 'modal-header.component.scss',
    shadow: true,
})
export class ModalHeader {
    render() {
        return (
            <Host class="p-modal-header">
                <slot />
            </Host>
        );
    }
}
