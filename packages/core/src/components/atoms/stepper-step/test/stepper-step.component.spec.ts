import { newSpecPage } from '@stencil/core/testing';
import { StepperStep } from '../stepper-step.component';

describe('p-stepper-step', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [StepperStep],
            html: '<p-stepper-step></p-stepper-step>',
        });
        expect(root).toEqualHtml(`
      <p-stepper-step class="p-stepper-step">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-stepper-step>
    `);
    });
});
