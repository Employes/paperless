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
     * Wether we should scroll lock the body
     */
    @Prop() scrollLock: boolean = true;

    /**
     * When the backdrop is clicked
     */
    @Event() clicked: EventEmitter<MouseEvent>;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    componentWillLoad() {
        if (this.scrollLock) {
            document.querySelector(':root').classList.add('scroll-lock');
        }
    }

    disconnectedCallback() {
        if (this.scrollLock) {
            document.querySelector(':root').classList.remove('scroll-lock');
        }
    }

    render() {
        return (
            <Host
                class={`p-backdrop variant-${this.variant} ${
                    this.applyBlur && 'blurred'
                } ${this.closing && 'closing'}`}
            >
                <div class="content-container">
                    <slot />
                </div>
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
