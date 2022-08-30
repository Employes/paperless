import { Component, Element, h, Host, Prop } from '@stencil/core';
import { RotateOptions } from '../../../utils/types';
import { IconFlipOptions, IconVariant } from '../../atoms/icon/icon.component';

@Component({
    tag: 'p-input-group',
    styleUrl: './input-group.component.scss',
})
export class InputGroup {
    /**
     * The prefix of the input group
     */
    @Prop() prefix: string;

    /**
     * The suffix of the input group
     */
    @Prop() suffix: string;

    /**
     * Icon of the navigation item
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
     * The label of the input group
     */
    @Prop() label: string;

    /**
     * The helper of the input group
     */
    @Prop() helper: string;

    /**
     * The helper of the input group
     */
    @Prop({ reflect: true }) error: string;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    render() {
        const hasHelperSlot = !!this._el.querySelector('[slot="helper"]');
        const hasLabelSlot = !!this._el.querySelector('[slot="label"]');
        const hasPrefixSlot = !!this._el.querySelector('[slot="prefix"]');
        const hasSuffixSlot = !!this._el.querySelector('[slot="suffix"]');

        const helper = hasHelperSlot ? <slot name="helper" /> : this.helper;
        const label = hasLabelSlot ? <slot name="label" /> : this.label;
        const prefix = hasPrefixSlot ? <slot name="prefix" /> : this.prefix;
        const suffix = hasSuffixSlot ? <slot name="suffix" /> : this.suffix;

        const errorAndErrorIsNotBoolean =
            this.error &&
            typeof this.error === 'string' &&
            this.error !== 'true';

        return (
            <Host class="p-input-group">
                <div class={`input-group ${this.error?.length && 'error'}`}>
                    <div class="flex justify-between items-end">
                        <div class="input-label">{label}</div>

                        <div class="input-header">
                            <slot name="header" />
                            {helper && <p-helper>{helper}</p-helper>}
                        </div>
                    </div>
                    <div class="content">
                        {(prefix || this.icon) && (
                            <div class="prefix">
                                {this.icon ? (
                                    <p-icon
                                        variant={this.icon}
                                        rotate={this.iconRotate}
                                        flip={this.iconFlip}
                                    />
                                ) : (
                                    prefix
                                )}
                            </div>
                        )}
                        {(suffix || errorAndErrorIsNotBoolean) && (
                            <div class="suffix">
                                {errorAndErrorIsNotBoolean ? (
                                    <p-tooltip
                                        class="flex"
                                        variant="error"
                                        popover={this.error}
                                    >
                                        <p-icon
                                            class="text-negative-light hover:text-negative"
                                            slot="content"
                                            variant="explanation"
                                        />
                                    </p-tooltip>
                                ) : (
                                    suffix
                                )}
                            </div>
                        )}
                        <slot name="input" />
                    </div>
                </div>
            </Host>
        );
    }
}
