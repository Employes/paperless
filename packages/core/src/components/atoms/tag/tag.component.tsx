import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-tag',
    styleUrl: 'tag.component.scss',
    shadow: true,
})
export class Tag {
    /**
     * Variant of the tag
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

    render() {
        return (
            <Host class="p-tag">
                <div class="circle"></div>
                <slot />
            </Host>
        );
    }
}
