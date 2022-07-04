import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'p-button',
  styleUrl: 'button.component.scss',
  shadow: true,
})
export class Button {
  /**
   * The name
   */
  @Prop() variant: 'primary' | 'secondary' = 'primary';

  render() {
    return (
      <button class={`variant-${this.variant}`}>
        <slot />
      </button>
    );
  }
}
