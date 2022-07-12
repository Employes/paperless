import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'p-counter',
  styleUrl: 'counter.component.scss',
  shadow: true,
})
export class Counter {
  render() {
    return (
      <Host class="p-counter">
        <slot />
      </Host>
    );
  }
}
