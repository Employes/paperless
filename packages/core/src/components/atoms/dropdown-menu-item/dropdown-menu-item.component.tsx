import { Component, h, Host, Prop } from '@stencil/core';
import { IconVariant } from '../icon/icon.component';

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

    /**
     * Wether to enable the hover state
     */
    @Prop() enableHover: boolean = true;

    /**
     * Icon of the navigation item
     */
    @Prop() icon: IconVariant;

    render() {
        return (
            <Host
                class={`p-dropdown-menu-item ${this.active && 'active'} ${
                    this.enableHover && 'hover'
                }`}
            >
                {this.icon && <p-icon variant={this.icon} />}

                <div class="text-container">
                    <slot />
                </div>
            </Host>
        );
    }
}
