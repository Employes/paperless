import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-backdrop',
    styleUrl: 'backdrop.component.scss',
    shadow: true,
})
export class Backdrop {
    @Prop() applyBlur: boolean = false;

    render() {
        return (
            <Host class={`p-backdrop ${this.applyBlur && 'blurred'}`}>
                <slot />
            </Host>
        );
    }
}
