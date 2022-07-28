import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-card-header',
    styleUrl: 'card-header.component.scss',
})
export class CardHeader {
    /**
     * Title of the card header
     */
    @Prop() title: string;

    /**
     * Enable the title arrow
     */
    @Prop() arrow: boolean = false;

    render() {
        return (
            <Host class="p-card-header">
                {(this.title?.length || this.arrow) && (
                    <div class="title">
                        {this.title ?? ''}
                        {this.arrow && <p-icon variant="arrow" />}
                    </div>
                )}
                <slot />
            </Host>
        );
    }
}
