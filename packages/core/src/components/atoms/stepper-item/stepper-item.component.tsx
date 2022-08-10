import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-stepper-item',
    styleUrl: 'stepper-item.component.scss',
    shadow: true,
})
export class StepperItem {
    /**
     * The alignment of the step content
     */
    @Prop({ reflect: true }) align: 'start' | 'center' | 'end' = 'center';

    /**
     * The direction of the stepper step
     */
    @Prop({ reflect: true }) direction: 'horizontal' | 'vertical' =
        'horizontal';

    /**
     * Wether the step is finished
     */
    @Prop({ reflect: true }) finished: boolean = false;

    /**
     * Wether the step is active
     */
    @Prop({ reflect: true }) active: boolean = false;

    render() {
        return (
            <Host class="p-stepper-item">
                <div class="content">
                    <slot />
                </div>
                <div class="circle">
                    {this.finished && <p-icon variant="checkmark" />}
                </div>
            </Host>
        );
    }
}
