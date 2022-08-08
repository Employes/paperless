import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-stepper-step',
    styleUrl: 'stepper-step.component.scss',
    shadow: true,
})
export class StepperStep {
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
            <Host class="p-stepper-step">
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
