import { createPopper, Placement } from '@popperjs/core';
import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'p-tooltip',
  styleUrl: 'tooltip.component.scss',
  shadow: true,
})
export class Tooltip {
  /**
   * The content of the tooltip
   */
  @Prop() content: any = null;

  /**
   * The content of the tooltip
   */
  @Prop() placement: Placement = 'top';

  /**
   * Wether to force show the tooltip
   */
  @Prop() forceShow: boolean = false;

  /**
   * The host element
   */
  @Element() private _el: HTMLElement;

  private _loaded = false;
  private _popper: any;
  private _tooltip: HTMLElement;

  componentShouldUpdate() {
    this._setOptions();
    if (this.forceShow) {
      this._show();
    }
  }

  render() {
    return (
      <Host class="p-tooltip">
        <slot name="content" />
        <div class="tooltip" role="tooltip" ref={el => this._load(el)}>
          {this.content ? this.content : <slot name="tooltip" />}
          <div class="arrow" data-popper-arrow></div>
        </div>
      </Host>
    );
  }

  @Listen('mouseenter')
  @Listen('focus')
  protected _show() {
    if (!this._loaded) {
      return;
    }

    // Make the tooltip visible
    this._tooltip.setAttribute('data-show', '');

    // Enable the event listeners
    this._popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
    }));

    // Update its position
    this._popper.update();
  }

  @Listen('mouseleave')
  @Listen('blur')
  protected _hide() {
    if (!this._loaded && !this.forceShow) {
      return;
    }

    // Hide the tooltip

    this._tooltip.removeAttribute('data-show');

    // Disable the event listeners
    this._popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
    }));
  }

  private _load(tooltip: HTMLElement) {
    this._tooltip = tooltip;
    if (tooltip) {
      this._popper = createPopper(this._el, tooltip);

      this._setOptions();
      this._loaded = true;

      if (this.forceShow) {
        this._show();
      }
    }
  }

  private _setOptions() {
    if (!this._popper) {
      return;
    }

    this._popper.setOptions({
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  }
}
