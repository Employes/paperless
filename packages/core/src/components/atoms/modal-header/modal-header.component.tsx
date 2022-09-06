import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-modal-header',
    styleUrl: 'modal-header.component.scss',
    shadow: true,
})
export class ModalHeader {
    /**
     * Wether to show the close button on mobile
     */
    @Prop() showMobileClose = true;

    /**
     * Close click event
     */
    @Event() close: EventEmitter<MouseEvent>;

    render() {
        return (
            <Host class="p-modal-header">
                <span>
                    <slot />
                </span>

                {this.showMobileClose && (
                    <div class="close" onClick={() => this.close.emit()}>
                        <p-icon variant="negative" />
                    </div>
                )}
            </Host>
        );
    }
}
