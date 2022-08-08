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
    @Prop() align: 'start' | 'center' | 'end' = 'center';

    /**
     * The direction of the stepper step
     */
    @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

    /**
     * Wether the step is finished
     */
    @Prop() finished: boolean = false;

    /**
     * Wether the step is active
     */
    @Prop() active: boolean = false;

    render() {
        return (
            <Host
                class={`p-stepper-step align-${this.align} direction-${
                    this.direction
                } ${this.finished && 'finished'} ${this.active && 'active'}`}
            >
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
