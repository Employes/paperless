import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-card-container',
    styleUrl: 'card-container.component.scss',
    shadow: true,
})
export class CardContainer {
    /**
     * Wether the card should be hoverable
     */
    @Prop() hoverable: boolean = false;

    render() {
        return (
            <Host class={`p-card-container ${this.hoverable && 'has-hover'}`}>
                <slot />
            </Host>
        );
    }
}
