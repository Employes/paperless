import { Component, h, Host, Prop } from '@stencil/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  tag: 'p-loader',
  styleUrl: 'loader.component.scss',
  shadow: true,
})
export class Loader {
  /**
   * Wether to show or hide the loader
   */
  @Prop() show: boolean | Observable<boolean> = true;

  /**
   * Variant of loader
   */
  @Prop() variant: 'inline' | 'full-width' | 'full-screen' | 'modal' = 'inline';

  /**
   * Color of the loader
   */
  @Prop() color: 'indigo' | 'white' | 'storm' = 'indigo';

  /**
   * !NOT IMPLEMENTED! Modal title for modal variant
   */
  @Prop() modalTitle: string;

  /**
   * !NOT IMPLEMENTED! Modal description for modal variant
   */
  @Prop() modalDescription: string;

  private _show = this.show;
  private _showSubscriber: Subscription;

  private _loader = (<div class={`loader color-${this.color}`}></div>);

  componentWillRender() {
    this._checkShow();
  }

  componentShouldUpdate() {
    this._checkShow();
  }

  render() {
    if (!this._show) {
      return;
    }

    if (this.variant === 'full-screen') {
      return (
        <Host class="p-loader">
          <div class="loading-screen">
            <div class="content">
              <slot />

              <div class="loader-wrapper">{this._loader}</div>
            </div>
          </div>
        </Host>
      );
    }

    return <Host class={`p-loader flex ${this.variant === 'full-width' && 'w-100 d-block flex justify-center text-4xl'}`}>{this._loader}</Host>;
  }

  private _checkShow() {
    if (this._showSubscriber) {
      this._showSubscriber.unsubscribe();
      this._showSubscriber = null;
    }

    if (typeof this.show !== 'boolean') {
      this._showSubscriber = this.show?.subscribe(show => (this._show = show));
      return;
    }

    this._show = this.show;
  }
}
