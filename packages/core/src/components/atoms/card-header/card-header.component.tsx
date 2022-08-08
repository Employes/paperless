import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-card-header',
    styleUrl: 'card-header.component.scss',
})
export class CardHeader {
    /**
     * Content of the card header
     */
    @Prop() header: string;

    /**
     * Enable the title arrow
     */
    @Prop() arrow: boolean = false;

    render() {
        return (
            <Host class="p-card-header">
                {(this.header?.length || this.arrow) && (
                    <div class="title">
                        {this.header ?? ''}
                        {this.arrow && <p-icon variant="arrow" />}
                    </div>
                )}
                <slot />
            </Host>
        );
    }
}
