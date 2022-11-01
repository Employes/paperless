import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-label',
    styleUrl: 'label.component.scss',
    shadow: true,
})
export class Label {
    /**
     * Variant of the label
     */
    @Prop({ reflect: true }) variant:
        | 'positive'
        | 'unbiased'
        | 'negative'
        | 'info' = 'info';

    /**
     * Wether to add the circle or not
     */
    @Prop({ reflect: true }) circle: boolean = true;

    /**
     * The size of the label
     */
    @Prop({ reflect: true }) size: 'small' | 'default' = 'default';

    render() {
        return (
            <Host class="p-label">
                <div class="circle"></div>
                <slot />
            </Host>
        );
    }
}
