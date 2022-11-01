import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-dropdown-menu-container',
    styleUrl: 'dropdown-menu-container.component.scss',
    // shadow: true,
})
export class DropdownMenuContainer {
    /**
     * Wether the container applies it's max width
     */
    @Prop() maxWidth: boolean = true;

    render() {
        return (
            <Host
                class={`p-dropdown-menu-container ${
                    this.maxWidth && 'max-width'
                }`}
            >
                <slot />
            </Host>
        );
    }
}
