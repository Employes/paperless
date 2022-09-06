import { createPopper, Placement, PositioningStrategy } from '@popperjs/core';
import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';

@Component({
    tag: 'p-tooltip',
    styleUrl: 'tooltip.component.scss',
    shadow: true,
})
export class Tooltip {
    /**
     * The variant of the popover
     */
    @Prop() variant: 'hover' | 'click' | 'error' = 'hover';

    /**
     * The content of the popover
     */
    @Prop() popover: any = null;

    /**
     * The placement of the popover
     */
    @Prop() placement: Placement = 'top';

    /**
     * The strategy of the popover placement
     */
    @Prop() strategy: PositioningStrategy = 'fixed';

    /**
     * Wether to show the popover
     */
    @Prop() show: boolean = false;

    /**
     * Wether to someone can manually close the popover
     */
    @Prop() canManuallyClose: boolean = true;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    private _loaded = false;
    private _popper: any;
    private _popover: HTMLElement;

    componentShouldUpdate() {
        this._setOptions();
        if (this._loaded && this.show) {
            this._show();
        }
    }

    render() {
        return (
            <Host class="p-popover">
                <slot name="content" />
                <div class="popover-container">
                    <div
                        class={`popover variant-${this.variant}`}
                        role="popover"
                        ref={(el) => this._load(el)}
                    >
                        {this.popover ? this.popover : <slot name="popover" />}
                        <div class="arrow" data-popper-arrow></div>
                    </div>
                </div>
            </Host>
        );
    }

    @Listen('click', { capture: true })
    protected clickHandler() {
        if (this.variant !== 'click') {
            return;
        }

        if (this._popover.hasAttribute('data-show')) {
            return;
        }

        this._show();
    }

    @Listen('click', { target: 'document', capture: true })
    protected documentClickHandler() {
        if (this.variant !== 'click' || !this.canManuallyClose) {
            return;
        }

        if (!this._popover.hasAttribute('data-show')) {
            return;
        }

        this._hide();
    }

    @Listen('mouseenter')
    @Listen('focus')
    protected mouseEnterHandler() {
        if (this.variant === 'click') {
            return;
        }

        this._show();
    }

    @Listen('mouseleave')
    @Listen('blur')
    protected mouseLeaveHandler() {
        if (this.show || this.variant === 'click') {
            return;
        }

        this._hide();
    }

    private _show() {
        if (!this._loaded) {
            return;
        }

        // Make the popover visible
        this._popover.setAttribute('data-show', '');

        // Enable the event listeners
        this._popper.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
        }));

        // Update its position
        this._popper.update();
    }

    private _hide() {
        if (!this._loaded) {
            return;
        }

        // Hide the popover
        this._popover.removeAttribute('data-show');

        // Disable the event listeners
        this._popper.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }));
    }

    private _load(popover: HTMLElement) {
        this._popover = popover;
        if (popover) {
            this._popper = createPopper(this._el, popover, {
                strategy: this.strategy,
            });

            this._setOptions();
            this._loaded = true;

            if (this.show) {
                setTimeout(() => this._show(), 100);
            }
        }
    }

    private _setOptions() {
        if (!this._popper) {
            return;
        }

        this._popper.setOptions({
            placement: this.variant === 'error' ? 'top-end' : this.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: this.variant === 'error' ? [8, 14] : [0, 8],
                    },
                },
                {
                    name: 'arrow',
                    options: {
                        padding: 4,
                    },
                },
            ],
        });
    }
}
