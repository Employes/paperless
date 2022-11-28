import { Component, h, Host } from '@stencil/core';

// $drawer-xs: 20rem;
// $drawer-sm: 33.5rem;
// $drawer-md: 38rem;
// $drawer-lg: 47.5rem;
// $drawer-xl: 57.5rem;

@Component({
    tag: 'p-drawer-container',
    styleUrl: 'drawer-container.component.scss',
})
export class ModalContainer {
    render() {
        return (
            <Host class="p-drawer-container">
                <slot />
            </Host>
        );
    }
}
