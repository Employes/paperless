import { Placement } from '@floating-ui/dom';
import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-helper',
    styleUrl: 'helper.component.scss',
    shadow: true,
})
export class Helper {
    /**
     * The placement of the helper popover
     */
    @Prop() placement: Placement = 'top';

    render() {
        return (
            <Host class="p-helper">
                <p-tooltip placement={this.placement}>
                    <div slot="popover">
                        <slot />
                    </div>

                    <div slot="content" class="helper"></div>
                </p-tooltip>
            </Host>
        );
    }
}
