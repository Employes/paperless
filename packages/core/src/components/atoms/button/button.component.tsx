import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'p-button',
  styleUrl: 'button.component.scss',
  shadow: true,
})
export class Button {
  /**
   * The variant of the button
   */
  @Prop() variant: 'primary' | 'secondary' = 'primary';

  render() {
    return (
      <Host>
        <button class={`variant-${this.variant}`}>
          <slot />
        </button>
      </Host>
    );
  }
}
