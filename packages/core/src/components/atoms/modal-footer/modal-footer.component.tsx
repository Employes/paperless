import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-modal-footer',
    styleUrl: 'modal-footer.component.scss',
    shadow: true,
})
export class ModalFooter {
    /**
     * Wether to show the footer on mobile
     */
    @Prop() hideOnMobile = true;

    render() {
        return (
            <Host
                class={`p-modal-footer ${
                    this.hideOnMobile && 'hide-on-mobile'
                }`}
            >
                <p-divider class="mb-6 mt-0" />
                <slot />
            </Host>
        );
    }
}
