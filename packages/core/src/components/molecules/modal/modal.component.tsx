import { Component, Element, h, Host, Prop } from '@stencil/core';

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
     * The title of the modal
     */
    @Prop() title: string;

    /**
     * Wether to show the modal or not
     */
    @Prop() show: boolean = false;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    private _hasFooterSlot = false;

    componentWillLoad() {
        this._hasFooterSlot = !!this._el.querySelector('[slot="footer"]');
    }

    render() {
        if (!this.show) {
            return;
        }

        const titleContent = <slot name="title" />;
        const bodyContent = <slot name="content" />;
        const footerContent = <slot name="footer" />;

        return (
            <Host class="p-modal">
                <p-modal-backdrop>
                    <p-modal-container size={this.size}>
                        <p-modal-header>
                            {this.title ? this.title : titleContent}
                        </p-modal-header>
                        <p-modal-body variant={this.variant}>
                            {bodyContent}
                        </p-modal-body>
                        {this._hasFooterSlot && (
                            <p-modal-footer>{footerContent}</p-modal-footer>
                        )}
                    </p-modal-container>
                </p-modal-backdrop>
            </Host>
        );
    }
}
