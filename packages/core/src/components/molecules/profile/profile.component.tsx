import { Component, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
    tag: 'p-profile',
    styleUrl: 'profile.component.scss',
    shadow: true,
})
export class Profile {
    /**
     * The variant of the profile
     */
    @Prop() variant: 'company' | 'user' = 'user';

    /**
     * The size of the profile avatar
     */
    @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'small';

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    @State() private _dropdownOpen = false;

    render() {
        const hasDropdownSlot = !!this._el.querySelector('[slot="dropdown"]');
        const content = this._getContent(hasDropdownSlot);
        return (
            <Host
                class={`p-profile ${hasDropdownSlot && 'has-dropdown'} ${
                    this._dropdownOpen && 'active'
                }`}
            >
                {hasDropdownSlot ? (
                    <p-dropdown
                        class="w-full min-w-0"
                        strategy="absolute"
                        placement={
                            this.variant === 'user' ? 'top-end' : 'bottom-end'
                        }
                        onIsOpen={(ev) => (this._dropdownOpen = ev.detail)}
                    >
                        {content}
                        <div slot="items">
                            <slot name="dropdown" />
                        </div>
                    </p-dropdown>
                ) : (
                    content
                )}
            </Host>
        );
    }

    private _getContent(hasDropdownSlot) {
        const avatar = this._generateAvatar();

        return (
            <div class="content" slot="trigger">
                {avatar}
                <div class="name">
                    <slot name="title" />
                    <slot name="subtitle" />
                </div>

                {hasDropdownSlot && this._getIcon()}
            </div>
        );
    }

    private _generateAvatar() {
        const avatar = this._el.querySelector(
            'p-avatar[slot="avatar"]'
        ) as HTMLPAvatarElement;

        if (!avatar) {
            return;
        }

        return (
            <p-avatar
                class="flex"
                src={avatar.src ?? null}
                default-image={avatar.defaultImage ?? null}
                variant={this.variant ?? avatar.variant}
                size={this.size}
            ></p-avatar>
        );
    }

    private _getIcon() {
        return (
            <p-icon
                class="ml-auto"
                variant={this.variant === 'company' ? 'chevron' : 'more'}
            />
        );
    }
}
