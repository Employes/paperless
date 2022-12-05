import {
    Component,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Prop,
    State,
} from '@stencil/core';

@Component({
    tag: 'p-modal',
    shadow: true,
})
export class Modal {
    /**
     * The size of the modal container
     */
    @Prop() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

    /**
     * The variant of the modal body
     */
    @Prop() variant: 'default' | 'table' = 'default';

    /**
     * The Header of the modal
     */
    @Prop() header?: string;

    /**
     * Wether to show the modal or not
     */
    @Prop() show: boolean = false;

    /**
     * Wether to apply blur to the backdrop
     */
    @Prop() applyBlur: boolean = false;

    /**
     * Wether to show the close on mobile in the header
     */
    @Prop() showMobileClose = true;

    /**
     * Wether to show the footer on mobile
     */
    @Prop() showMobileFooter = false;

    /**
     * Wether to hide the modal when the backdrop is clicked
     */
    @Prop() backdropClickClose = true;

    /**
     * Close click event
     */
    @Event() closeClicked: EventEmitter<MouseEvent>;

    /**
     * Closed event
     */
    @Event() closed: EventEmitter<null>;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    private _hasFooterSlot = false;
    private _hasHeaderSlot = false;

    @State() private _closing = false;

    componentWillLoad() {
        this._hasFooterSlot = !!this._el.querySelector(
            ':scope > [slot="footer"]'
        );
        this._hasHeaderSlot = !!this._el.querySelector(
            ':scope > [slot="header"]'
        );
    }

    render() {
        if (!this.show) {
            return;
        }

        const headerContent = <slot name="header" />;
        const bodyContent = <slot name="content" />;
        const footerContent = <slot name="footer" />;

        return (
            <Host class="p-modal">
                <p-backdrop
                    applyBlur={this.applyBlur}
                    onClicked={(ev) => this._backdropClick(ev.detail)}
                    closing={this._closing}
                >
                    <p-modal-container size={this.size} closing={this._closing}>
                        {(this.header?.length || this._hasHeaderSlot) && (
                            <p-modal-header
                                show-mobile-close={this.showMobileClose}
                                onClose={(ev) => this.close(ev.detail)}
                            >
                                {this._hasHeaderSlot
                                    ? headerContent
                                    : this.header}
                            </p-modal-header>
                        )}
                        <p-modal-body variant={this.variant}>
                            {bodyContent}
                        </p-modal-body>
                        {this._hasFooterSlot && (
                            <p-modal-footer
                                hide-on-mobile={this.showMobileFooter}
                            >
                                {footerContent}
                            </p-modal-footer>
                        )}
                    </p-modal-container>
                </p-backdrop>
            </Host>
        );
    }

    private _backdropClick(ev: MouseEvent) {
        if (!this.backdropClickClose) {
            return;
        }

        this.close(ev);
    }

    public close(ev: MouseEvent) {
        this.closeClicked.emit(ev);

        this._closing = true;

        setTimeout(() => {
            this.show = false;
            this._closing = false;
            this.closed.emit();
        }, 550);
    }
}
