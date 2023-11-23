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
        | 'neutral'
        | 'positive'
        | 'unbiased'
        | 'negative'
        | 'special'
        | 'info' = 'neutral';

    /**
     * Define the behavior of the label
     */
    @Prop({ reflect: true }) behavior:
        | 'icon'
        | 'circle'
        | 'combination'
        | 'text'
        | 'icon-only' = 'circle';

    /**
     * Icon position
     */
    @Prop() iconPosition: 'start' | 'end' = 'start';

    /**
     * Icon to show on the label
     */
    @Prop({ reflect: true }) icon: IconVariant;

    /**
     * Icon flip
     */
    @Prop() iconFlip: IconFlipOptions;

    /**
     * Icon rotate
     */
    @Prop() iconRotate: RotateOptions;

    /**
     * The size of the label
     */
    @Prop({ reflect: true }) size: 'small' | 'default' = 'default';

    /**
     * Wether to keep the content on mobile
     */
    @Prop({ reflect: true }) keepMobileContent: boolean = false;

    render() {
        return (
            <Host class="p-label">
                {this.icon && this.iconPosition === 'start' && (
                    <p-icon
                        variant={this.icon}
                        flip={this.iconFlip}
                        rotate={this.iconRotate}
                    />
                )}
                {(this.behavior === 'circle' ||
                    this.behavior === 'combination') && (
                    <div class="circle"></div>
                )}
                <div class="content">
                    <slot />
                </div>
                {this.icon && this.iconPosition === 'end' && (
                    <p-icon
                        variant={this.icon}
                        flip={this.iconFlip}
                        rotate={this.iconRotate}
                    />
                )}
            </Host>
        );
    }
}
