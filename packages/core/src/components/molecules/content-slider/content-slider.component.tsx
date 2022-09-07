import { Component, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
    tag: 'p-content-slider',
    styleUrl: 'content-slider.component.scss',
    shadow: true,
})
export class ContentSlider {
    /**
     * Wether to hide the indicator on mobile
     */
    @Prop() hideMobileIndicator: boolean = false;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    @State() private _visibleIndex: number;
    private _scrollHandlerTimeout: NodeJS.Timeout;
    private _contentRef: Element;
    private _items: HTMLElement[] = [];

    componentWillRender() {
        const items = this._el.querySelectorAll(':scope > *');
        this._items = Array.from(items) as HTMLElement[];
    }

    componentDidLoad() {
        this._calculateIndicator();
    }

    render() {
        return (
            <Host class="p-content-slider">
                <div
                    class="content"
                    ref={(el) => (this._contentRef = el)}
                    onScroll={() => this._handleScroll()}
                >
                    <slot />
                </div>
                <div
                    class={`indicator ${this.hideMobileIndicator && 'hidden'}`}
                >
                    {this._items.map((_, i) => (
                        <p-slider-indicator active={i === this._visibleIndex} />
                    ))}
                </div>
            </Host>
        );
    }

    private _handleScroll() {
        if (this._scrollHandlerTimeout) {
            clearTimeout(this._scrollHandlerTimeout);
        }

        this._scrollHandlerTimeout = setTimeout(
            () => this._calculateIndicator(),
            200
        );
    }

    private _calculateIndicator() {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            const visible = this._isVisible(item);

            if (visible) {
                this._visibleIndex = i;
            }

            if (i === 0 && visible) {
                break;
            }
        }

        console.log(this._visibleIndex);
    }

    private _isVisible(el: HTMLElement) {
        if (!this._contentRef || !el) {
            return false;
        }

        const elRect = el.getBoundingClientRect();
        const containerRect = this._el.getBoundingClientRect();

        return (
            elRect.left > containerRect.left &&
            elRect.right < containerRect.right
        );
    }
}
