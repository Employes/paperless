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
    @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

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
    onSrchChange(src: string, oldSrc?: string) {
        console.log('src changed');
        console.log('old src', oldSrc, this._src);
        this._src = src;
        console.log('new src', src, this._src);
    }

    componentWillLoad() {
        console.log('Will render');
        this.onSrchChange(this.src);
        if (!this._src) {
            this._setDefaultLink();
        }
    }

    render() {
        console.log('Rendering!', this._src);
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
