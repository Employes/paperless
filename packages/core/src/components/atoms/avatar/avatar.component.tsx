import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

@Component({
    tag: 'p-avatar',
    styleUrl: 'avatar.component.scss',
    // shadow: true,
})
export class Avatar {
    /**
     * The variant of the avatar
     */
    @Prop({ reflect: true }) variant: 'user' | 'company' = 'user';

    /**
     * The size of the avatar
     */
    @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' | 'xlarge' =
        'medium';

    /**
     * The default image to show on errors
     */
    @Prop() defaultImage: string;

    /**
     * The image used for the avatar
     */
    @Prop() src!: string;

    @State() private _src: string;

    @Watch('src')
    onSrchChange(src: string) {
        this._src = src;
    }

    componentWillLoad() {
        this.onSrchChange(this.src);
        if (!this._src) {
            this._setDefaultLink();
        }
    }

    render() {
        return (
            <Host class="p-avatar">
                <img src={this._src} onError={() => this._setDefaultLink()} />
            </Host>
        );
    }

    private _setDefaultLink() {
        this._src =
            this.defaultImage ??
            (this.variant === 'user'
                ? '/assets/images/avatar/user-default.svg'
                : '/assets/images/avatar/company-default.svg');
    }
}
