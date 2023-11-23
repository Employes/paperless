import { Component, h, Host, Prop, Element } from '@stencil/core';
import { RotateOptions } from '../../../types/tailwind';
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
     * Wether the segment item is icon only
     */
    @Prop() iconOnly: boolean = false;

    /**
     * Size of the segment item
     */
    @Prop({ reflect: true }) size: 'small' | 'big' = 'small';

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

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    private _hasDescriptionSlot = false;

    componentWillLoad() {
        this._hasDescriptionSlot = !!this._el.querySelector(
            ':scope > [slot="description"]'
        );
    }

    render() {
        return (
            <Host
                class={`p-segment-item variant-${
                    this.iconOnly ? 'icon' : 'default'
                } ${this.active && 'active'}`}
            >
                {this.icon && this._getIcon()}
                <slot />
                {this.size === 'big' && this._hasDescriptionSlot && <span class="description"><slot name="description" /></span>}
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
