import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'p-floating-menu-container',
    styleUrl: 'floating-menu-container.component.scss',
    shadow: true,
})
export class FloatingMenuContainer {
    render() {
        return (
            <Host class="p-floating-menu-container">
                <slot />
            </Host>
        );
    }
}
