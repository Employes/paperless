import { newSpecPage } from '@stencil/core/testing';
import { Divider } from '../calendar.component';

describe('p-calendar', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [Divider],
            html: '<p-calendar></p-calendar>',
        });
        expect(root).toEqualHtml(`
      <p-calendar class="p-calendar">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-calendar>
    `);
    });
});
