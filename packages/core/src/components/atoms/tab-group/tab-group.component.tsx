import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'p-tab-group',
    styleUrl: 'tab-group.component.scss',
    shadow: true,
})
export class TabGroup {
    render() {
        return (
            <Host class="p-tab-group">
                <div class="content">
                    <slot />
                </div>
                <p-divider />
            </Host>
        );
    }
}
