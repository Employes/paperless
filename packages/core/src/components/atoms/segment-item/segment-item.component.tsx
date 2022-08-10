import { Component, h, Host, Prop } from '@stencil/core';
import { RotateOptions } from '../../../utils/types';
import { IconFlipOptions, IconVariant } from '../icon/icon.component';

@Component({
    tag: 'p-segment-item',
    styleUrl: 'segment-item.component.scss',
    shadow: true,
})
export class SegmentItem {
    /**
     * Wether the segment item is active
     */
    @Prop() active: boolean = false;

    /**
     * Icon to show on the segment item
     */
    @Prop() icon: IconVariant;

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
                class={`p-segment-item variant-${
                    this.icon ? 'icon' : 'default'
                } ${this.active && 'active'}`}
            >
                {this.icon ? this._getIcon() : <slot />}
            </Host>
        );
    }

    private _getIcon() {
        if (!this.icon) {
            return;
        }

        return (
            <p-icon
                class="flex"
                variant={this.icon}
                flip={this.iconFlip}
                rotate={this.iconRotate}
            />
        );
    }
}
