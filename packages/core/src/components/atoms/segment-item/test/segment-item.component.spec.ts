import { newSpecPage } from '@stencil/core/testing';
import { Divider } from '../divider.component';

describe('p-segment-item', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [Divider],
            html: '<p-segment-item></p-segment-item>',
        });
        expect(root).toEqualHtml(`
      <p-segment-item class="p-segment-item">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-segment-item>
    `);
    });
});
