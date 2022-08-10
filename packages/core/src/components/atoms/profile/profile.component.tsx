import { Component, Element, h, Host } from '@stencil/core';

@Component({
    tag: 'p-profile',
    styleUrl: 'profile.component.scss',
    shadow: true,
})
export class Profile {
    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    render() {
        const avatar = this._generateAvatar();

        return (
            <Host class="p-profile">
                {avatar}
                <div class="name">
                    <slot name="title" />
                    <slot name="subtitle" />
                </div>
            </Host>
        );
    }

    private _generateAvatar() {
        const avatar = this._el.querySelector(
            'p-avatar[slot="avatar"]'
        ) as HTMLPAvatarElement;

        return (
            <p-avatar
                class="flex"
                src={avatar.src ?? null}
                default-image={avatar.defaultImage ?? null}
                variant={avatar.variant}
                size="small"
            ></p-avatar>
        );
    }
}
