import { Component, h, Host, Prop } from '@stencil/core';
import { IconVariant } from '../../atoms/icon/icon.component';

@Component({
    tag: 'p-navigation-item',
    styleUrl: 'navigation-item.component.scss',
    shadow: true,
})
export class NavigationItem {
    /**
     * Wether the navigation item is active
     */
    @Prop() active: boolean = false;

    /**
     * Icon of the navigation item
     */
    @Prop() icon: IconVariant;

    /**
     * Icon of the navigation item
     */
    @Prop() counter: number | string;

    /**
     * The href of the navigation item
     */
    @Prop() href: string;

    /**
     * The target of the navigation item
     */
    @Prop() target: string;

    render() {
        return (
            <Host>
                <a
                    class={`p-navigation-item ${this.active && 'active'}`}
                    href={this.href}
                    target={this.target}
                >
                    {this.icon && <p-icon variant={this.icon} />}
                    <span class={this.counter && 'has-counter'}>
                        <slot />
                    </span>
                    {this.counter && <p-counter>{this.counter}</p-counter>}
                </a>
            </Host>
        );
    }
}
