import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'p-dropdown-menu-container',
    styleUrl: 'dropdown-menu-container.component.scss',
    // shadow: true,
})
export class DropdownMenuContainer {
    render() {
        return (
            <Host class="p-dropdown-menu-container">
                <slot />
            </Host>
        );
    }
}
