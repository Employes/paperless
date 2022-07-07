import { Component, h, Host, Prop } from '@stencil/core';
import icons from '../../../utils/icons';

export type IconVariant = keyof typeof icons;
export type IconFlipOptions = 'horizontal' | 'vertical';

@Component({
  tag: 'p-icon',
  // shadow: true,
})
export class Icon {
  /**
   * The icon the be displayed
   */
  @Prop() variant: IconVariant = null;

  /**
   * The size of the icon, using tailwind sizes
   */
  @Prop() size: string = 'auto';

  /**
   * Wether to rotate the icon x degrees
   */
  @Prop() rotate: number = null;

  /**
   * Wether to flip the icon horizontally or vertically
   */
  @Prop() flip: IconFlipOptions = null;

  render() {
    const icon = icons[this.variant];

    return <Host class={this._getClass()} innerHTML={icon}></Host>;
  }

  private _getClass() {
    return `p-icon inline-block text-${this.size} ${this.rotate || this.flip ? 'transform' : ''} ${
      this.rotate ? `${this.rotate < 0 ? '-' : ''}rotate-${this.rotate < 0 ? this.rotate * -1 : this.rotate}` : ''
    } ${this.flip ? `scale-${this.flip === 'horizontal' ? 'x' : 'y'}-flip` : ''}`;
  }
}
