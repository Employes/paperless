import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-toast-container',
    styleUrl: 'toast-container.component.scss',
    shadow: true,
})
export class ToastContainer {
    /**
     * The placement of the container
     */
    @Prop() placement: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' =
        'top-end';

    /**
     * top-0 bottom-0 left-0 right-0 static
     */
    render() {
        return (
            <Host
                class={{
                    'p-toast-container': true,
                    static: true,
                    'top-0': this.placement.indexOf('top') === 0,
                    'bottom-0': this.placement.indexOf('bottom') === 0,
                    'left-0': this.placement.indexOf('start') > 0,
                    'right-0': this.placement.indexOf('end') > 0,
                }}
            >
                <slot />
            </Host>
        );
    }
}
