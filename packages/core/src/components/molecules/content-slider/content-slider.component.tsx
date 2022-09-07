import {
    Component,
    Element,
    h,
    Host,
    Listen,
    Prop,
    State,
} from '@stencil/core';

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
     * Wether to disable dragging the content
     */
    @Prop() disableDrag: boolean = false;

    /**
     * Wether to disable clicking the indicator scrolls content
     */
    @Prop() disableIndicatorClick: boolean = false;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    @State() private _visibleIndex: number;
    private _scrollHandlerTimeout: NodeJS.Timeout;
    private _contentRef: Element;
    private _items: HTMLElement[] = [];

    // mouse movement stuff
    private _pos = { top: 0, left: 0, x: 0, y: 0 };
    @State() private _dragging = false;

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
                    class={`content ${!this.disableDrag && 'draggable'} ${
                        this._dragging && 'dragging'
                    }`}
                    ref={(el) => (this._contentRef = el)}
                    onScroll={() => this._handleScroll()}
                    onMouseDown={(e) => this._mouseDownHandler(e)}
                >
                    <slot />
                </div>
                <div
                    class={`indicator ${this.hideMobileIndicator && 'hidden'}`}
                >
                    {this._items.map((_, i) => (
                        <p-slider-indicator
                            class={
                                !this.disableIndicatorClick && 'cursor-pointer'
                            }
                            onClick={() => this._scrollTo(i)}
                            active={i === this._visibleIndex}
                        />
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

    private _mouseDownHandler(e) {
        if (this.disableDrag || this._dragging) {
            return;
        }

        this._pos = {
            // The current scroll
            left: this._contentRef.scrollLeft,
            top: this._contentRef.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        this._dragging = true;
    }

    @Listen('mousemove', { target: 'window' })
    mouseMoveHandler(e) {
        if (!e || !this._dragging || this.disableDrag) {
            return;
        }

        // How far the mouse has been moved
        const dx = e.clientX - this._pos.x;
        const dy = e.clientY - this._pos.y;

        // Scroll the element
        this._contentRef.scrollTop = this._pos.top - dy;
        this._contentRef.scrollLeft = this._pos.left - dx;
    }

    @Listen('mouseup', { target: 'window' })
    mouseUpHandler() {
        this._dragging = false;
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
    }

    private _isVisible(el: HTMLElement) {
        if (!this._el || !this._contentRef || !el) {
            return false;
        }

        const elRect = el.getBoundingClientRect();
        const containerRect = this._el.getBoundingClientRect();

        return (
            elRect.left > containerRect.left &&
            elRect.right < containerRect.right
        );
    }

    private _scrollTo(i: number) {
        if (this.disableIndicatorClick) {
            return;
        }

        const el = this._items[i];

        const parent = el.offsetParent;

        const parentStyle = getComputedStyle(parent);
        const gap = parseInt(parentStyle.gap.replace('px', ''));
        const padding =
            parseInt(parentStyle['paddingLeft'].replace('px', '')) +
            parseInt(parentStyle['paddingRight'].replace('px', ''));

        this._contentRef.scrollTo({
            left: el.offsetLeft - gap - padding - el.clientWidth / 2,
            behavior: 'smooth',
        });
    }
}
