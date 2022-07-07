import { Component, h, Host, Prop } from '@stencil/core';
import { IconFlipOptions, IconVariant } from '../icon/icon.component';

@Component({
  tag: 'p-button',
  styleUrl: 'button.component.scss',
  // shadow: true,
})
export class Button {
  /**
   * The variant of the button
   */
  @Prop() variant: 'primary' | 'secondary' | 'text' = 'primary';

  /**
   * The size of the button
   */
  @Prop() size: 'small' | 'medium' = 'medium';

  /**
   * Wether to show a loader or not
   */
  @Prop() loading: boolean = false;

  /**
   * Icon to show on the button
   */
  @Prop() icon: IconVariant;

  /**
   * Icon position
   */
  @Prop() iconPosition: 'start' | 'end' = 'end';

  /**
   * Icon flip
   */
  @Prop() iconFlip: IconFlipOptions;

  /**
   * Icon rotate
   */
  @Prop() iconRotate: number;

  render() {
    let loaderColor: 'white' | 'storm' | 'indigo' = 'white';
    switch (this.variant) {
      case 'secondary':
        loaderColor = 'storm';
        break;
      case 'text':
        loaderColor = 'indigo';
        break;
    }

    return (
      <Host class="p-button">
        <button class={`variant-${this.variant} size-${this.size} icon-position-${this.iconPosition}`}>
          {this.icon && this.iconPosition === 'start' && this._getIcon()}

          <slot />

          {this.icon && this.iconPosition === 'end' && this._getIcon()}

          {this.loading && <p-loader color={loaderColor} />}
        </button>
      </Host>
    );
  }

  private _getIcon() {
    if (!this.icon) {
      return;
    }

    return <p-icon variant={this.icon} flip={this.iconFlip} rotate={this.iconRotate} />;
  }
}
