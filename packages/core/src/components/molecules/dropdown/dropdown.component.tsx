import { createPopper, Placement, PositioningStrategy } from '@popperjs/core';
import {
    Component,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Listen,
    Prop,
} from '@stencil/core';
import { childOf } from '../../../utils/child-of';

@Component({
    tag: 'p-dropdown',
    styleUrl: 'dropdown.component.scss',
    shadow: true,
})
export class Dropdown {
    /**
     * The content of the dropdown menu
     */
    @Prop({ reflect: true }) placement: Placement = 'bottom-start';

    /**
     * The strategy of the popover placement
     */
    @Prop() strategy: PositioningStrategy = 'fixed';

    /**
     * Wether to show the dropdown menu
     */
    @Prop() show: boolean = false;

    /**
     * Wether to automatically close the dropdown menu after clicking inside
     */
    @Prop() insideClick: boolean = false;

    /**
     * Wether to automatically close the dropdown menu after clicking inside
     */
    @Prop() disableTriggerClick: boolean = false;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    /**
     * Open change event
     */
    @Event() isOpen: EventEmitter<boolean>;

    private _loaded = false;
    private _popper: any;
    private _menu: HTMLElement;

    componentShouldUpdate() {
        this._setOptions();
        if (this._loaded && this.show) {
            this._show();
        }
    }

    render() {
        return (
            <Host class="p-dropdown">
                <div
                    class="trigger"
                    onClick={() => this._triggerClickHandler()}
                >
                    <slot
                        onSlotchange={(ev) => this._checkButton(ev)}
                        name="trigger"
                    />
                </div>
                <p-dropdown-menu-container
                    role="popover"
                    ref={(el) => this._load(el)}
                    onClick={() => this._containerClickHandler()}
                >
                    <slot name="items" />
                </p-dropdown-menu-container>
            </Host>
        );
    }

    private _checkButton({ target }: Event) {
        const slot = target as HTMLSlotElement;
        const children = slot.assignedElements();

        for (let child of children) {
            if (child.nodeName === 'P-BUTTON') {
                (child as any).chevron =
                    this.placement.indexOf('top') >= 0 ? 'up' : 'down';
            }
        }
    }

    private _containerClickHandler() {
        if (this.insideClick) {
            return;
        }

        if (this._menu.hasAttribute('data-show')) {
            this._hide();
        }
    }

    private _triggerClickHandler() {
        if (this.disableTriggerClick) {
            return;
        }

        if (this._menu.hasAttribute('data-show')) {
            this._hide();
            return;
        }

        this._show();
    }

    @Listen('click', { target: 'document', capture: true })
    protected documentClickHandler({ target }) {
        if (
            !this._menu.hasAttribute('data-show') ||
            childOf(target, this._el)
        ) {
            return;
        }

        this._hide();
    }

    private _load(popover: HTMLElement) {
        this._menu = popover;
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
            placement: this.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });
    }

    private _show() {
        if (!this._loaded) {
            return;
        }

        // Make the popover visible
        this._menu.setAttribute('data-show', '');
        this.isOpen.emit(true);

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
        if (!this._loaded || this.show) {
            return;
        }

        // Hide the popover
        this._menu.removeAttribute('data-show');
        this.isOpen.emit(false);

        // Disable the event listeners
        this._popper.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }));
    }
}
