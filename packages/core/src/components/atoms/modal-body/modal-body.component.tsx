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

    /**
     * Wether the modal body should be rounded at the bottom
     */
    @Prop() rounded: boolean = false;

    render() {
        return (
            <Host
                class={`p-modal-body variant-${this.variant} ${
                    this.rounded && 'is-rounded'
                }`}
            >
                <slot />
            </Host>
        );
    }
}
