import { Component, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core';
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
   * Href in case of "text" version
   */
  @Prop() href: string;

  /**
   * Target in case of "text" version
   */
  @Prop() target: string;

  /**
   * The size of the button
   */
  @Prop() size: 'small' | 'medium' = 'medium';

  /**
   * Wether to show a loader or not
   */
  @Prop() loading: boolean = false;

  /**
   * Wether the button is disabled
   */
  @Prop() disabled: boolean = false;

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

  /**
   * Button press event
   */
  @Event() click: EventEmitter<MouseEvent>;

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

    const VariableTag = this.variant === 'text' ? 'a' : 'button';

    return (
      <Host class="p-button">
        <VariableTag class={`variant-${this.variant} size-${this.size} icon-position-${this.iconPosition}`} disabled={this.disabled} href={this.href} target={this.target}>
          {this.icon && this.iconPosition === 'start' && this._getIcon()}

          <slot />

          {this.icon && this.iconPosition === 'end' && this._getIcon()}

          {this.loading && <p-loader color={loaderColor} />}
        </VariableTag>
      </Host>
    );
  }

  @Listen('click', { capture: true })
  handleClick(ev: MouseEvent) {
    if (this.loading || this.disabled) {
      return;
    }

    this.click.emit(ev);
  }

  private _getIcon() {
    if (!this.icon) {
      return;
    }

    return <p-icon variant={this.icon} flip={this.iconFlip} rotate={this.iconRotate} />;
  }
}
