import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-stepper',
    styleUrl: 'stepper.component.scss',
    shadow: true,
})
export class Stepper {
    /**
     * The currently active step
     */
    @Prop() activeStep: number = 1;

    /**
     * The direction of the stepper
     */
    @Prop({ reflect: true }) direction: 'horizontal' | 'vertical' =
        'horizontal';

    /**
     * The position of the content in case of vertical direction
     */
    @Prop({ reflect: true }) contentPosition: 'start' | 'end' = 'end';

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    private _steps: Array<HTMLPStepperItemElement>;

    componentWillRender() {
        const activeStep = this.activeStep - 1;
        this._steps = this._generateSteps(activeStep);
    }

    render() {
        return <Host class="p-stepper">{this._steps}</Host>;
    }

    private _generateSteps(activeStep: number) {
        const elements = [];
        const items = this._el.querySelectorAll('p-stepper-item');

        for (let i = 0; i < items?.length; i++) {
            const item = items.item(i);

            if (i > 0) {
                elements.push(
                    <p-stepper-line
                        direction={this.direction}
                        active={i <= activeStep}
                    />
                );
            }

            const newItem = (
                <p-stepper-item
                    active={i === activeStep}
                    finished={i < activeStep}
                    direction={this.direction}
                    align={
                        i === 0
                            ? 'start'
                            : i === items?.length - 1
                            ? 'end'
                            : 'center'
                    }
                    contentPosition={this.contentPosition}
                >
                    {item.innerHTML}
                </p-stepper-item>
            );

            elements.push(newItem);
        }

        return elements;
    }
}
