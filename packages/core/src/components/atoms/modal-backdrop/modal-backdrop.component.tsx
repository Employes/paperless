import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'p-modal-backdrop',
    styleUrl: 'modal-backdrop.component.scss',
    shadow: true,
})
export class ModalBackdrop {
    render() {
        return (
            <Host class="p-modal-backdrop">
                <slot />
            </Host>
        );
    }
}
