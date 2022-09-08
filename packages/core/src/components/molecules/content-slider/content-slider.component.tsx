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
     * Wether to disable auto centering the content
     */
    @Prop() disableAutoCenter: boolean = false;

    /**
     * Wether to disable clicking the indicator scrolls content
     */
    @Prop() disableIndicatorClick: boolean = false;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    @State() private _visibleIndex: number;
    @State() private _outerHeight = 0;
    @State() private _totalWidth = 0;
    private _indicatorTimeout: NodeJS.Timeout;
    private _sliderRef: HTMLElement;
    private _innerSliderRef: HTMLElement;
    private _items: HTMLElement[] = [];
    private _innerSliderResizeObserver: ResizeObserver;

    // mouse movement stuff
    private _startX: number;
    @State() private _dragging = false;

    componentWillRender() {
        const items = this._el.querySelectorAll(':scope > *');
        this._items = Array.from(items) as HTMLElement[];
    }

    componentDidLoad() {
        this._calculateWidth();
        this._calculateIndicator();
    }

    disconnectedCallback() {
        if (this._innerSliderResizeObserver) {
            this._innerSliderResizeObserver.disconnect();
        }
    }

    render() {
        return (
            <Host class="p-content-slider">
                <div
                    class={`slider ${!this.disableDrag && 'draggable'} ${
                        this._dragging && 'dragging'
                    }`}
                    style={{
                        height: `${this._outerHeight}px`,
                    }}
                    ref={(el) => (this._sliderRef = el)}
                    onMouseDown={(e) => this._mouseDownHandler(e)}
                    onTouchStart={(e) => this._mouseDownHandler(e)}
                    onMouseMove={(e) => this._mouseMoveHandler(e)}
                    onTouchMove={(e) => this._mouseMoveHandler(e)}
                >
                    <div
                        class="inner-slider"
                        ref={(ref) => this._setInnerSliderReft(ref)}
                    >
                        <slot />
                    </div>
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

    private _setInnerSliderReft(ref) {
        this._innerSliderRef = ref;
        this._innerSliderResizeObserver = new ResizeObserver(() =>
            this._calculateHeight()
        );
        this._innerSliderResizeObserver.observe(this._innerSliderRef);
    }

    private _mouseDownHandler(e) {
        if (this.disableDrag || this._dragging) {
            return;
        }

        const innerSliderStyle = getComputedStyle(this._innerSliderRef);
        if (innerSliderStyle.flexWrap === 'wrap') {
            return;
        }

        let x = e.x;
        const sliderRect = this._sliderRef.getBoundingClientRect();
        if (e.type === 'touchstart') {
            x = e.touches?.[0].clientX;
        }

        this._startX = x - sliderRect.x - this._innerSliderRef.offsetLeft;
        this._dragging = true;
    }

    private _mouseMoveHandler(e) {
        if (!e || !this._dragging || this.disableDrag) {
            return;
        }

        e.preventDefault();

        if (
            this._innerSliderRef.style.getPropertyValue('pointer-events') === ''
        ) {
            this._innerSliderRef.style.pointerEvents = 'none';
        }

        let x = e.offsetX;
        if (e.type === 'touchmove') {
            const sliderRect = this._sliderRef.getBoundingClientRect();
            x = e.touches?.[0].clientX - sliderRect.left;
        }

        this._innerSliderRef.style.left = `${x - this._startX}px`;

        this._checkBoundary();
        this._calculateIndicator();
    }

    private _checkBoundary() {
        let outer = this._sliderRef.getBoundingClientRect();
        if (parseInt(this._innerSliderRef.style.left) > 0) {
            this._innerSliderRef.style.left = '0px';
        }
        const maxLeft = (this._totalWidth - outer.width) * -1;
        if (parseInt(this._innerSliderRef.style.left) < maxLeft) {
            this._innerSliderRef.style.left = `${maxLeft}px`;
        }
    }

    @Listen('mouseup', { target: 'window' })
    @Listen('touchend', { target: 'window' })
    mouseUpHandler() {
        this._dragging = false;
        this._innerSliderRef.style.removeProperty('pointer-events');
    }

    @Listen('resize', { target: 'window' })
    resizeHandler() {
        if (this._innerSliderRef) {
            this._innerSliderRef.style.left = '0px';
            this._calculateWidth();
            this._calculateIndicator();
        }
    }

    private _calculateIndicator() {
        if (this._indicatorTimeout) {
            clearTimeout(this._indicatorTimeout);
            this._indicatorTimeout = null;
        }

        this._indicatorTimeout = setTimeout(() => {
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

            if (!this.disableAutoCenter) {
                this._scrollTo(this._visibleIndex, false);
            }
        }, 200);
    }

    private _isVisible(el: HTMLElement) {
        if (!this._el || !el) {
            return false;
        }

        const elRect = el.getBoundingClientRect();
        const sliderRect = this._sliderRef.getBoundingClientRect();

        return (
            (elRect.left >= sliderRect.left &&
                elRect.right <= sliderRect.right) ||
            (this._isMobile(el) &&
                elRect.left + elRect.width / 2 >= sliderRect.left &&
                elRect.left + elRect.width / 2 <= sliderRect.right)
        );
    }

    private _scrollTo(i: number, calculateIndicator = true) {
        if (this.disableIndicatorClick && calculateIndicator) {
            return;
        }

        const el = this._items[i];

        if (i === 0) {
            this._innerSliderRef.style.left = '0px';
            this._calculateIndicator();
            return;
        }

        const sliderRect = this._sliderRef.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        const centerOffset =
            el.offsetLeft + elRect.width / 2 - sliderRect.width / 2;
        this._innerSliderRef.style.left = `-${centerOffset}px`;

        this._checkBoundary();

        if (!calculateIndicator) {
            this._calculateIndicator();
        }
    }

    private _calculateWidth() {
        let totalWidth = 0;

        for (let item of this._items) {
            const rect = item.getBoundingClientRect();
            totalWidth += rect.width;
        }

        const sliderStyle = getComputedStyle(this._sliderRef);
        const padding = parseInt(sliderStyle.padding) * 2;

        const innerSliderStyle = getComputedStyle(this._innerSliderRef);
        const gap = parseInt(innerSliderStyle.gap) * (this._items.length - 1);

        totalWidth += padding + gap;

        this._totalWidth = totalWidth;
    }

    private _calculateHeight() {
        const outerHeight = this._items.at(0).getBoundingClientRect().height;
        if (outerHeight != this._outerHeight) {
            this._outerHeight = outerHeight;
        }
    }

    private _isMobile(el?: HTMLElement) {
        if (!el) {
            el = this._items.at(0);
        }

        const elRect = el.getBoundingClientRect();
        const sliderRect = this._sliderRef.getBoundingClientRect();

        return sliderRect.width - elRect.width < 10;
    }
}
