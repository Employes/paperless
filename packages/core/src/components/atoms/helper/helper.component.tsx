import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'p-helper',
  styleUrl: 'helper.component.scss',
  shadow: true,
})
export class Helper {
  render() {
    return (
      <Host class="p-helper">
        <p-tooltip>
          <div slot="tooltip">
            <slot />
          </div>

          <div slot="content" class="helper"></div>
        </p-tooltip>
      </Host>
    );
  }
}
