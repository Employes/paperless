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
     * Wether to add the circle
     */
    @Prop({ reflect: true }) circle: boolean = false;

    /**
     * Icon to show on the label
     */
    @Prop({ reflect: true }) icon: IconVariant;

    /**
     * The size of the label
     */
    @Prop({ reflect: true }) size: 'small' | 'default' = 'default';

    /**
     * Wether to show only the icon on mobile
     */
    @Prop({ reflect: true }) mobileIcon: boolean = false;

    /**
     * Wether it's icon only
     */
    @Prop({ reflect: true }) iconOnly: boolean = false;

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
                {this.icon && (
                    <p-icon
                        variant={this.icon}
                        flip={this.iconFlip}
                        rotate={this.iconRotate}
                    />
                )}
                <div class="content">
                    {this.circle && <div class="circle"></div>}
                    <slot />
                </div>
            </Host>
        );
    }
}
