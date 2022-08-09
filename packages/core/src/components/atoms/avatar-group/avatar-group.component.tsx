import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-avatar-group',
    styleUrl: 'avatar-group.component.scss',
    // shadow: true,
})
export class AvatarGroup {
    /**
     * The amount to show after the avatars
     */
    @Prop() extra: number;

    render() {
        return (
            <Host class="p-avatar-group">
                <slot />

                {this.extra && <span class="extra">+{this.extra}</span>}
            </Host>
        );
    }
}
