import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-dropdown-menu-item',
    styleUrl: 'dropdown-menu-item.component.scss',
    shadow: true,
})
export class DropdownMenuItem {
    /**
     * Wether the dropdown menu item is active
     */
    @Prop() active: boolean = false;

    render() {
        return (
            <Host class={`p-dropdown-menu-item ${this.active && 'active'}`}>
                <slot />
            </Host>
        );
    }
}
