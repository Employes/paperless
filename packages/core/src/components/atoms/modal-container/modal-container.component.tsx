import { Component, h, Host, Prop } from '@stencil/core';

// $modal-xs: 20rem;
// $modal-sm: 33.5rem;
// $modal-md: 38rem;
// $modal-lg: 47.5rem;
// $modal-xl: 57.5rem;

const modalSizes = {
    xs: 'w-80',
    sm: 'w-[33.5rem]',
    md: 'w-[38rem]',
    lg: 'w-[47.5rem]',
    xl: 'w-[57.5rem]',
};
@Component({
    tag: 'p-modal-container',
    styleUrl: 'modal-container.component.scss',
})
export class ModalContainer {
    /**
     * The size of the modal container
     */
    @Prop() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

    render() {
        const sizeClass = modalSizes[this.size];

        return (
            <Host class={`p-modal-container ${sizeClass}`}>
                <slot />
            </Host>
        );
    }
}
