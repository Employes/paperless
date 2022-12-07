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

@Component({
    tag: 'p-backdrop',
    styleUrl: 'backdrop.component.scss',
    shadow: true,
})
export class Backdrop {
    /**
     * The variant of the backdrop
     */
    @Prop() variant: 'modal' | 'drawer' = 'modal';

    /**
     * Wether to apply blur on the background of the backdrop
     */
    @Prop() applyBlur: boolean = false;

    /**
     * Wether the backdrop is closing
     */
    @Prop() closing: boolean = false;

    /**
     * When the backdrop is clicked
     */
    @Event() clicked: EventEmitter<MouseEvent>;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    render() {
        return (
            <Host
                class={`p-backdrop variant-${this.variant} ${
                    this.applyBlur && 'blurred'
                } ${this.closing && 'closing'}`}
            >
                <slot />
            </Host>
        );
    }

    @Listen('click', { capture: true })
    handleClick(ev: MouseEvent) {
        if (ev.target !== this._el) {
            return;
        }

        this.clicked.emit(ev);
    }
}
