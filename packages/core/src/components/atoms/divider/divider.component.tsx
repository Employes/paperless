import { Component, Element, h, Host } from '@stencil/core';

@Component({
    tag: 'p-divider',
    styleUrl: 'divider.component.scss',
    shadow: true,
})
export class Divider {
    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    render() {
        const hasSlotted = !!this._el.innerHTML?.length;
        return (
            <Host class="p-divider">
                <div class="container">
                    <div class={`flex items-center ${hasSlotted && 'px-2'}`}>
                        <slot />
                    </div>
                </div>
            </Host>
        );
    }
}
