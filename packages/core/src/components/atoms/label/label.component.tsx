import { Component, h, Host, Prop } from '@stencil/core';
import { RotateOptions } from '../../../types';
import { IconFlipOptions, IconVariant } from '../icon/icon.component';

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

    /**
     * Wether to show icon on mobile
     */
    @Prop({ reflect: true }) mobileIcon: boolean = true;

    /**
     * Wether it's icon only
     */
    @Prop({ reflect: true }) iconOnly: boolean = false;

    /**
     * Icon to show on the button
     */
    @Prop() icon: IconVariant = 'plus';

    /**
     * Icon flip
     */
    @Prop() iconFlip: IconFlipOptions;

    /**
     * Icon rotate
     */
    @Prop() iconRotate: RotateOptions;

    render() {
        return (
            <Host
                class={`p-label ${this.mobileIcon && 'mobile-icon'} ${
                    this.iconOnly && 'icon-only'
                }`}
            >
                <p-icon
                    variant={this.icon}
                    flip={this.iconFlip}
                    rotate={this.iconRotate}
                />
                <div class="content">
                    <div class="circle"></div>
                    <slot />
                </div>
            </Host>
        );
    }
}
