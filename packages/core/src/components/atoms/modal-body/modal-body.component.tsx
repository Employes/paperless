import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-modal-body',
    styleUrl: 'modal-body.component.scss',
    shadow: true,
})
export class ModalBody {
    /**
     * The variant of the modal body
     */
    @Prop() variant: 'default' | 'table' = 'default';

    render() {
        return (
            <Host class={`p-modal-body variant-${this.variant}`}>
                <slot />
            </Host>
        );
    }
}
