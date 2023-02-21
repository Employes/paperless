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

    // private _steps: Array<HTMLPStepperItemElement>;

    componentDidLoad() {
        const activeStep = this.activeStep - 1;
        this._generateSteps(activeStep);
    }

    render() {
        return (
            <Host class="p-stepper">
                <slot />
            </Host>
        );
    }

    private _generateSteps(activeStep: number) {
        const items = this._el.querySelectorAll('p-stepper-item');

        for (let i = 0; i < items?.length; i++) {
            const item = items.item(i);

            item.active = i === activeStep;
            item.finished = i < activeStep;
            item.direction = this.direction;
            item.align =
                i === 0 ? 'start' : i === items?.length - 1 ? 'end' : 'center';
            item.contentPosition = this.contentPosition;

            const heightDiff = (item.clientHeight - 16) / 2;

            if (i > 0) {
                const stepperLine = document.createElement('p-stepper-line');
                stepperLine.direction = this.direction;
                stepperLine.active = i <= activeStep;

                if (heightDiff > 0 && this.direction === 'vertical') {
                    stepperLine.style.marginTop = `-${heightDiff / 16}rem`;
                    stepperLine.style.marginBottom = `-${heightDiff / 16}rem`;
                    stepperLine.style.minHeight = `calc(1rem + ${
                        (heightDiff * 2) / 16
                    }rem)`;
                }

                this._el.insertBefore(stepperLine, item);
            }

            // const child = item.querySelector('[slot="content"]');
            // const newItem = (
            //     <p-stepper-item

            //     >
            //         <div slot="content" innerHTML={child.outerHTML} />
            //     </p-stepper-item>
            // );

            // elements.push(newItem);
        }

        // return elements;
    }
}
