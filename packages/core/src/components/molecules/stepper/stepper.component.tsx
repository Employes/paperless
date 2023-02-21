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

    componentDidRender() {
        this._generateSteps();
    }

    render() {
        return (
            <Host class="p-stepper">
                <slot />
            </Host>
        );
    }

    private _generateSteps() {
        let activeStep = this.activeStep - 1 || 0;
        const items = this._el.querySelectorAll('p-stepper-item');

        console.log('active step', activeStep, this.activeStep);
        if (!this.activeStep || activeStep < 0) {
            const arrayItems = Array.from(items);
            const activeItemIndex = arrayItems.findIndex(
                (i: any) =>
                    i.tagName.toLowerCase() === 'p-stepper-item' &&
                    i.active &&
                    !i.finished
            );

            if (activeItemIndex >= 0) {
                console.log('Edit activeStep active');
                activeStep = activeItemIndex;
            }

            const finishedItemIndex = arrayItems.findIndex(
                (i: any) =>
                    i.tagName.toLowerCase() === 'p-stepper-item' && i.finished
            );
            if (activeStep < 0 && finishedItemIndex >= 0) {
                console.log('Edit activeStep finished');
                activeStep = finishedItemIndex + 1;
            }
        }

        for (let i = 0; i < items?.length; i++) {
            const item = items.item(i) as any;

            console.log({
                i,
                activeStep,
                thisActiveStep: this.activeStep,
            });

            item.active = i === activeStep;
            item.finished = i < activeStep;
            item.direction = this.direction;
            item.align =
                i === 0 ? 'start' : i === items?.length - 1 ? 'end' : 'center';
            item.contentPosition = this.contentPosition;

            if (i < items.length - 1) {
                const nextItem = item.nextElementSibling;
                if (
                    nextItem &&
                    nextItem.tagName.toLowerCase() === 'p-stepper-item'
                ) {
                    const heightDiff = (item.clientHeight - 16) / 2;

                    const stepperLine =
                        document.createElement('p-stepper-line');

                    stepperLine.direction = this.direction;
                    stepperLine.active = i <= activeStep;

                    if (heightDiff > 0 && this.direction === 'vertical') {
                        stepperLine.style.marginTop = `-${heightDiff / 16}rem`;
                        stepperLine.style.marginBottom = `-${
                            heightDiff / 16
                        }rem`;
                        stepperLine.style.minHeight = `calc(1rem + ${
                            (heightDiff * 2) / 16
                        }rem)`;
                    }

                    this._el.insertBefore(stepperLine, nextItem);

                    continue;
                }
            }

            if (i > 0) {
                const previousItem = item.previousElementSibling;
                if (previousItem.tagName.toLowerCase() === 'p-stepper-line') {
                    previousItem.direction = this.direction;
                    previousItem.active = item.active || item.finished;
                }
            }
        }
    }
}
