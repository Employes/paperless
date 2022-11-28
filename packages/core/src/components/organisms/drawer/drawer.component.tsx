import {
    Component,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Prop,
} from '@stencil/core';

@Component({
    tag: 'p-drawer',
    shadow: true,
})
export class Drawer {
    /**
     * The Header of the drawer
     */
    @Prop() header?: string;

    /**
     * Wether to show the drawer or not
     */
    @Prop() show: boolean = false;

    /**
     * Wether to apply blur to the backdrop
     */
    @Prop() applyBlur: boolean = false;

    /**
     * Wether to show the close on mobile in the header
     */
    @Prop() showClose = true;

    /**
     * Wether to hide the drawer when the backdrop is clicked
     */
    @Prop() backdropClickClose = true;

    /**
     * Close click event
     */
    @Event() close: EventEmitter<MouseEvent>;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    private _hasHeaderSlot = false;

    componentWillLoad() {
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

        return (
            <Host class="p-drawer">
                <p-backdrop
                    variant="drawer"
                    applyBlur={this.applyBlur}
                    onClick={() => this.backdropClickClose && this.close.emit()}
                >
                    <p-drawer-container>
                        {(this.header?.length || this._hasHeaderSlot) && (
                            <p-drawer-header
                                show-close={this.showClose}
                                onClose={() => this.close.emit()}
                            >
                                {this._hasHeaderSlot
                                    ? headerContent
                                    : this.header}
                            </p-drawer-header>
                        )}
                        <p-drawer-body>{bodyContent}</p-drawer-body>
                    </p-drawer-container>
                </p-backdrop>
            </Host>
        );
    }
}
