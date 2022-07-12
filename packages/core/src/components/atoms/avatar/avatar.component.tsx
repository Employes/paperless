import { Component, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'p-avatar',
  styleUrl: 'avatar.component.scss',
  shadow: true,
})
export class Avatar {
  /**
   * The variant of the avatar
   */
  @Prop() variant: 'user' | 'company' = 'user';

  /**
   * The size of the avatar
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * The default image to show on errors
   */
  @Prop() defaultImage: string;

  /**
   * The image used for the avatar
   */
  @Prop() src!: string;

  @State() private _src = this.src;

  render() {
    return (
      <Host class={`p-avatar size-${this.size} variant-${this.variant}`}>
        <img src={this._src} onError={() => this._setDefaultLink()} />
      </Host>
    );
  }

  private _setDefaultLink() {
    this._src = this.defaultImage ?? (this.variant === 'user' ? '/assets/images/avatar/user-default.svg' : '/assets/images/avatar/company-default.svg');
  }
}
